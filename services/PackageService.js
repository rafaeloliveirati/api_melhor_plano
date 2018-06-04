const PackageRepository = require('../repositories/packageRepository')();
var plans = []

function compare(a, b) {
    return parseFloat(a.value) < parseFloat(b.value) ? -1 : parseFloat(a.value) > parseFloat(b.value) ? 1 : 0;
}

function getPlans(type, callbck) {
    PackageRepository.aggregate([
        {$match: {type: type}},
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
            createNewPlan(package, package.addons);
        })
    }).then(function () {
        callbck(plans.sort(compare));
    });
}

function createNewPlan(package, addons, name, value) {
    var newPlan = addNewPlan(name, value, package)
    if (package.edges && package.edges.length) {
        for (let i = 0; i < package.edges.length; i++) {
            var addon = filterAddon(package.edges[i]._id.toString(), addons)
            createNewPlan(addon, addons, newPlan.name, parseFloat(package.edges[i].value) + parseFloat(newPlan.value))
            for (let j = i + 1; j < package.edges.length; j++) {
                var addonSecundary = filterAddon(package.edges[j]._id.toString(), addons)
                createNewPlan(addon, addons, newPlan.name + " + " + addonSecundary.name, parseFloat(package.edges[i].value)
                    + parseFloat(addonSecundary.value) + parseFloat(newPlan.value) + parseFloat(package.edges[j].value))
            }
        }
    }
}

function addNewPlan(name, value, package) {
    let newPlan = {
        "name": (name ? name + " + " : "") + package.name,
        "value": (value ? parseFloat(value) : 0) + (package.value ? parseFloat(package.value) : 0)
    }
    for (let i = 0; i < plans.length; i++) {
        if (plans[i].name === newPlan.name) {
            return newPlan;
        }
    }
    plans.push(newPlan);
    return newPlan;
}

function filterAddon(id, list) {
    var addon = {};
    for (let i = 0; i < list.length; i++) {
        if (id == list[i]._id) {
            addon = list[i];
        }
    }
    return addon
}

module.exports = {addNewPlan, filterAddon, getPlans};
