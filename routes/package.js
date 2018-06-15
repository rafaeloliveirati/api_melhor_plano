const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/PackageController')
var cors = require('cors')
router.use(cors())

router.get('/list-all-broadband', function (req, res, next) {
    PackageController.get(req, res, next);
});

module.exports = router;