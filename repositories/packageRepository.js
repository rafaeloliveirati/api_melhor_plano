module.exports = function () {
    var mongoose = require('../config/conect_db')();
    var Schema = mongoose.Schema;
    var packageSchem = Schema({
        name: String,
        type: String,
        value: Number,
        edges: []
    })
    return mongoose.model('packages', packageSchem);
}