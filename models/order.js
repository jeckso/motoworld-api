const mongoose = require('mongoose');
const config = require('../config/database');

var Schema = mongoose.Schema;
var OrderSchema = new Schema(
    {
        number: {type: String, required: true, max: 100},
        description: {type: String, required: true, max: 100},
        price: {type: Number, required: true, min:0},
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

module.exports.addOrder = function (newOrder, callback) {
    newOrder.save(callback);
}
module.exports.getOrderById = function (id, callback) {
    Order.findById(id, callback);
}
module.exports.getOrderByName = function (name, callback) {
    const query = {name: name}
    Order.findOne(query, callback);
}