const mongoose = require('mongoose');
const config = require('../config/database');

var Schema = mongoose.Schema;
var ProductSchema = new Schema(
    {
        name: {type: String, required: true, max: 100},
        description: {type: String, required: true, max: 100},
        price: {type: Number, required: true, min:0},
        image: {type: String, required: true},
        category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
        date_of_creation: {type: Date},
    }
);

ProductSchema
    .virtual('url')
    .get(function () {
        return '/catalog/products/' + this._id;
    });


const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.findAll = (ids, cb) => {
    let objectIds = ids.map(id => mongoose.Types.ObjectId(id));
    Product.find({
        '_id': {
            $in: objectIds
        }
    }, function (err, docs) {
        if (err) {
            throw  err;
        }
        cb(docs);
    });
}

