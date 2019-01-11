const mongoose = require('mongoose');

const config = require('../config/database');

var Schema = mongoose.Schema;
var CategorySchema = new Schema(

    {
        name: {type: String, required: true, max: 100},
        date_of_creation: {type: Date},
    }
);
CategorySchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });
const Category = module.exports = mongoose.model('Category', CategorySchema);
module.exports.addCategory = function (newCategory, callback) {
    newCategory.save(callback);
}