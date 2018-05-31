const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/packageController')

router.get('/list-all-broadband', function (req, res, next) {
    PackageController.get(req, res, next);
});

router.get('/list-broadband', function (req, res, next) {
    PackageController.getById(req, res, next);
});

router.put('/', function (req, res, next) {
    PackageController.put(req, res, next);
});

module.exports = router;