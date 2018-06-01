const PackageRepository = require('../repositories/packageRepository')();
var plans = []
var addons = []

exports.get = (req, res, next) => {
    PackageRepository.findById('5b0d96eced26af3f0078a678').then((package) => {
    }).catch(err => res.status(500).send(err))
    res.status(200).send(plans);
};

function createNewPlan(parent, edge) {
    var plan;
    if (!edge) {
        plan = {
            "name": parent.name,
            "value": Number(parent.value)
        }
    } else {
        plan = {
            "name": parent.name + " + " + edge.name,
            "value": Number(parent.value) + Number(edge.value)
        }
    }
    return plan;
}

exports.getById = (req, res, next) => {
    PackageRepository.aggregate([
        // {$match: {name: 'Broadband1'}},
        {$match: {name: 'TV1'}},
        {
            $graphLookup: {
                from: 'packages',
                startWith: '$_id',
                connectFromField: 'edges._id',
                connectToField: '_id',
                as: 'addons'
            }
        }
    ], function (err, packages) {
        if (err) throw err;
        packages.forEach(function (package) {
            addons = package.addons;
            plans = [createNewPlan(package)]
            createRecursivePlan(package)
        })
        res.status(200).send(plans);
    })
};


function createRecursivePlan(package) {
    for (let i = 0; i < package.edges.length; i++) {
        var addon = filterAddon(package.edges[i]._id.toString(), addons, callbackFilterAddon);
        if (addon) {
            plans.push(createNewPlan(package, addon))
            if (addon.edges) {
                var addonTemp = {
                    "name": package.name + " + " + addon.name,
                    "value": getValue(package, callbackGetValue) + getValue(addon, callbackGetValue),
                    "edges": addon.edges
                }
                createRecursivePlan(addonTemp)
            }
        }
        for (let j = i + 1; j < package.edges.length; j++) {
            var addonSecundary = filterAddon(package.edges[j]._id.toString(), addons, callbackFilterAddon);
            plan = {
                "name": package.name + " + " + addon.name + " + " + addonSecundary.name,
                "value": getValue(package, callbackGetValue) + getValue(addonSecundary, callbackGetValue)
            }
            plans.push(plan)
            if (addon.edges) {
                var addonTemp = {
                    "name": addon.name + " + " + addonSecundary.name,
                    "value": getValue(addon, callbackGetValue) + getValue(addonSecundary, callbackGetValue),
                    "edges": addon.edges
                }
                createRecursivePlan(addonTemp)
            }
        }

    }
}

function getValue(element, callback) {
    return callbackGetValue(element)
}

function callbackGetValue(element) {
    if (!element)
        return 0
    var value = Number(element.value)
    return value ? value : 0
}

function filterAddon(id, lista, callback) {
    return callbackFilterAddon(id, lista)
}

function callbackFilterAddon(id, lista) {
    var findItem = "";
    for (let i = 0; i < lista.length; i++) {
        if (id == lista[i]._id) {
            findItem = lista[i]
        }
    }
    return findItem
}

exports.post = (req, res, next) => {
    PackageRepository.create(p).then((package) => {
        res.status(200).send(package);
    }).catch(err => res.status(500).send(err))
};

exports.put = (req, res, next) => {
    var package = {
        name: "teste",
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