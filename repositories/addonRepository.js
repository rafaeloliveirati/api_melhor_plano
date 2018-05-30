module.exports = function () {
    var db = require('../config/conect_db')();
    var mongoose = require('mongoose');
    var Schema = require('mongoose').Schema;
    var addon = Schema({
        name: String,
        type: String,
        value: Number
    })
    return mongoose.model('addon', addon)
}
