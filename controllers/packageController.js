const PackageRepository = require('../repositories/packageRepository')();
var plans = undefined

exports.get = (req, res, next) => {
    PackageRepository.findById('5b0d97ed3056cc2d50b3b548').then((package) => {
        plans = []
        // Create parent plan
        createNewPlan(package)
        //Create others plans by edges
        createNewEdge(package, package.edges);
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

function createNewEdge(parent, edges) {
    var plan;
    if (!edges) {
        plan = createNewPlan(parent);
        return;
    }
    for (i = 0; i < edges.length; i++) {
        var parentTemp = createNewPlan(parent, edges[i]);
        PackageRepository.findById(edges[i]._id).then((package) => {
            createNewEdge(parentTemp, package.edges)
        })
        for (j = i + 1; j < edges.length; j++) {
            planTemp = {
                "name": parentTemp.name + " + " + edges[j].name,
                "type": parentTemp.type + " + " + edges[j].type,
                "value": Number(parentTemp.value) + Number(edges[j].value)
            }
            createNewEdge(planTemp, edges[j].edges)
        }
    }
    return plans;
}

exports.getById = (req, res, next) => {
    PackageRepository.findById('5b0d96eced26af3f0078a678').then((package) => {
        res.status(200).send(package);
    }).catch(err => res.status(500).send(err))
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