const mongoose = require('mongoose');
const config = require('../config/database');

var Schema = mongoose.Schema;
var OrderSchema = new Schema(
    {
        description: {type: String, required: true, max: 100},
        delivery: {type: String, required: true},
        products: [{type: Schema.Types.ObjectId, ref: 'Order', required: true}],
        date_of_creation: {type: Date},
    }
);

OrderSchema
    .virtual('url')
    .get(function () {
        return '/catalog/products/' + this._id;
    });


const Order = module.exports = mongoose.model('Order', OrderSchema);

