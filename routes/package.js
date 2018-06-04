const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/PackageController')


router.get('/list-all-broadband', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    PackageController.get(req, res, next);
});

module.exports = router;