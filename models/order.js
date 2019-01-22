const mongoose = require('mongoose');
const config = require('../config/database');
const Product = require('./product');


var Schema = mongoose.Schema;
var OrderSchema = new Schema(
    {
        description: {type: String, required: true, max: 100},
        delivery: {type: String, required: true},
        sum: Number,
        items: [{id: String, quantity: Number}],
        date_of_creation: {type: Date},
    }
);

OrderSchema.method('getSum', function (cb) {
    let items = this.items.map(i => mongoose.Types.ObjectId(i.id));
    Product.find({
        '_id': {
            $in: items
        }
    }, function (err, docs) {
        let sum = 0;
        for (var i in docs) {
            sum += docs[i].price;
        }
        cb(sum);
    })
});

const Order = module.exports = mongoose.model('Order', OrderSchema);

