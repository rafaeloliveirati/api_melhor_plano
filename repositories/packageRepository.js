module.exports = function () {
    var db = require('../config/conect_db')();
    var mongoose = require('mongoose');
    var Schema = require('mongoose').Schema;
    var package = Schema({
        name: String,
        type: String,
        value: Number,
        edges: []
    })
    return mongoose.model('package', package)
}
