const PackageRepository = require('../repositories/packageRepository')();
var plans = undefined

exports.get = (req, res, next) => {
    PackageRepository.findById('5b0d96eced26af3f0078a678').then((package) => {
        plans = []
        createNewPlan(package)
        recursiveCreateNewEdge(package, package.edges);
    }).catch(err => res.status(500).send(err))
    res.status(200).send(plans);
};

function createNewPlan(parent, edge) {
    var plan;
    if (!edge) {
        plan = {
            "name": parent.name,
            "type": parent.type,
            "value": Number(parent.value)
        }
    } else {
        plan = {
            "name": parent.name + " + " + edge.name,
            "type": parent.type + " + " + edge.type,
            "value": Number(parent.value) + Number(edge.value)
        }
    }
    plans.push(plan)
    return plan;
}

function recursiveCreateNewEdge(parent, edges) {
    if (!edges) {
        createNewPlan(parent);
        return;
    }
    for (i = 0; i < edges.length; i++) {
        var parentTemp = null;
        parentTemp = createNewPlan(parent, edges[i]);
        PackageRepository.findById(edges[i]._id, function (err, package) {
            if (err) throw err;
            recursiveCreateNewEdge(package, package.edges)
        });
        for (j = i + 1; j < edges.length; j++) {
            planTemp = {
                "name": parentTemp.name + " + " + edges[j].name,
                "type": parentTemp.type + " + " + edges[j].type,
                "value": Number(parentTemp.value) + Number(edges[j].value)
            }
            recursiveCreateNewEdge(planTemp, edges[j].edges)
        }
    }
    return plans;
}

exports.getById = (req, res, next) => {
    PackageRepository.aggregate([
        {$match: {name: 'TV1'}},
        {$graphLookup:{
                from: 'packages',
                startWith: '$_id',
                connectFromField: 'edges._id',
                connectToField: '_id',
                as: 'addons'
            }
        }
    ], function (err, package) {
        if (err) throw err;
        console.log(package);
        res.status(200).send(package);
    })
    // PackageRepository.aggregate([
    //     {$match: {_id: '5b0d97ed3056cc2d50b3b548'}},
    // ]).then(res => console.log(res)).catch(error => console.error('error', error));
    // PackageRepository.find({_id: '5b0d979a3056cc2d50b3b546'}, function (err, package) {
    //     if (err) throw err;
    //     console.log(package.edges);
    // });
};

exports.post = (req, res, next) => {
    PackageRepository.create(p).then((package) => {
        res.status(200).send(package);
    }).catch(err => res.status(500).send(err))
};

exports.put = (req, res, next) => {
    var package = {
        name: "teste",
        type: "teste",
        value: "22.25"
    }
    PackageRepository.create(package).then((package) => {
        res.status(201).send(package);
    }).catch(err => res.status(500).send(err));
};

exports.delete = (req, res, next) => {
    PackageRepository.delete(req.params.id).then((plan) => {
        res.status(200).send('delete succeeded!');
    }).catch(err => console.error.bind(console, `Error ${err}`))
};