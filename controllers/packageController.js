const PackageRepository = require('../repositories/packageRepository')();

exports.get = (req, res, next) => {
    PackageRepository.findById('5b0d979a3056cc2d50b3b546').then((package) => {
        var plans = [];
        // packages.forEach(function (package) {
        plans.push(package)
        plans = createNewEdge(package, package.edges, plans);
        // package.edges.forEach(function (packageEdge) {
        //     if (!packageEdge)
        //         return;
        //     PackageRepository.findById(packageEdge._id).then((edge) => {
        //         console.log(edge)
        //         if (!edge)
        //             return;
        //         var plan = {
        //             "name": package.name + " + " + edge.name,
        //             "type": package.type + " + " + edge.type,
        //             "value": Number(package.value) + Number(edge.value)
        //         }
        //         plans.push(plan)
        //         edge.edges.forEach(function (edge) {
        //             var plan = {
        //                 "name": package.name + " + " + edge.name,
        //                 "type": package.type + " + " + edge.type,
        //                 "value": Number(package.value) + Number(edge.value)
        //             }
        //             plans.push(plan)
        //         })
        //     })
        // })
        // })
        res.status(200).send(plans);
    }).catch(err => res.status(500).send(err))
};

createNewPlan = (package, edge, edge2) => {
    var plan;
    if (!edge2) {
        plan = {
            "name": package.name + " + " + edge.name,
            "type": package.type + " + " + edge.type,
            "value": Number(package.value) + Number(edge.value)
        }
        console.debug(plan);
    } else {
        plan = {
            "name": package.name + " + " + edge.name + " + " + edge2.name,
            "type": package.type + " + " + edge.type + " + " + edge2.type,
            "value": Number(package.value) + Number(edge.value) + Number(edge2.value)
        }
    }
    return plan;
}

createNewEdge = (parent, edges, plans) => {
    var plan;
    for (i = 0; i < parent.edges.length; i++) {
        plan = createNewPlan(parent, parent.edges[i]);
        plans.push(plan)
        if (!edges[i]._id) {
            PackageRepository.findById(parent.edges[i]._id).then((edge) => {
                createNewEdge(edge[i], edge, plans);
            })
        }

        for (j = i + 1; j < parent.edges.length; j++) {
            plans.push(createNewPlan(plan, parent.edges[i], parent.edges[j]))
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