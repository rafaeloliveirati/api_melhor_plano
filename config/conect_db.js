var mongoose = require('mongoose');
var db;

module.exports = function () {
    if (!db) {
        db = mongoose.connect('mongodb://127.0.0.1/db_melhor_plano');
    }
    return db;
}