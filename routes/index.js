const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.status(200).send({
        title: "Melhor Plano 2018",
        version: "0.0.1"
    });
});

module.exports = router;
