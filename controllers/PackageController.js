const PackageService = require('../services/PackageService');

exports.get = (req, res, next) => {
    PackageService.getPlans("bb", function (plans) {
        res.status(200).send(plans);
    });
};
