var assert = require('assert');
const PackageService = require('../services/PackageService')

describe('PackageService.js', () => {

    //Valida a busca do addon dentro da lista
    it('filterAddon', () => {
        var list =
            [{
                _id: "5b0dc56b3056cc2d50b3b5ff",
                name: 'AddonTV-Ex1',
                type: 'addon'
            }, {
                _id: "5b0dc57e3056cc2d50b3b603",
                name: 'AddonTV',
                type: 'addon'
            }, {
                _id: "5b0d984b3056cc2d50b3b54c",
                name: 'TV2',
                type: 'tv',
                value: 120
            }, {
                _id: "5b0dc53b3056cc2d50b3b5fb",
                name: 'AddonTV-Ex2',
                type: 'addon'
            }, {
                _id: "5b0d97ed3056cc2d50b3b548",
                name: 'TV1',
                type: 'tv',
                value: 50
            }, {
                _id: "5b0d98363056cc2d50b3b54b",
                name: 'LandLine',
                type: 'II',
                value: 35
            }, {
                _id: "5b0d979a3056cc2d50b3b546",
                name: 'Broadband2',
                type: 'bb',
                value: 60
            }]

        var item = PackageService.filterAddon("5b0d98363056cc2d50b3b54b", list);
        assert.equal(item._id, "5b0d98363056cc2d50b3b54b");
        assert.equal(item.name, "LandLine");
    });

    //Valida a adica de um plano
    it('addNewPlan!', () => {
        var package = {
            _id: "5b0dc56b3056cc2d50b3b5ff",
            name: 'AddonTV-Ex1',
            type: 'addon',
            value: 22
        }
        const result = PackageService.addNewPlan("BroadBand", "30", package);
        assert.equal(result.name, "BroadBand + AddonTV-Ex1");
        assert.equal(result.value, 52);
    });

    // Valida a ordenaçao pelo valor
    it('getPlansSort!', () => {
        PackageService.getPlans("bb", function (plans) {
            for (let i = 0; i < plans.length; i++) {
                if (i == 0) {
                    continue;
                }
                if (plans[i - 1].value > plans[i]) {
                    assert(false);
                }
            }
            assert(true);
        });
    });

// Lembrar de tirar este test se caso a lista de planos seja dinamica
    it('getPlans!', () => {
        PackageService.getPlans("bb", function (plans) {
            assert.equal(plans.length, 43);
        });
    });
});