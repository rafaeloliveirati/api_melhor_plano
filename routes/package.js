const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/packageController')

router.get('/list-all-broadband', function (req, res, next) {
    PackageController.put(req, res, next);
});

router.put('/list-all-broadband', function (req, res, next) {
    console.debug(req.body);
    PackageController.put(req, res, next);
});

module.exports = router;