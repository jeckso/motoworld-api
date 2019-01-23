const mongoose = require('mongoose');
const config = require('../config/database');
const Product = require('./product');


var Schema = mongoose.Schema;
var OrderSchema = new Schema(
    {
        user_id:{type: Schema.Types.ObjectId, ref: 'User', required: true},
        description : {type: String, max: 100},
        delivery: {type: String, required: true},
        sum: Number,
        items: [{id: String, quantity: Number}],
        date_of_creation: {type: Date},
    }
);

OrderSchema.method('getSum', function (cb) {
    let items = this.items;
    let itemsIds = this.items.map(i => mongoose.Types.ObjectId(i.id));
    Product.find({
        '_id': {
            $in: itemsIds
        }
    }, function (err, docs) {
        let sum = 0;
        let products = [];
        for (var i in docs) {
            sum += docs[i].price * items[i].quantity;
            products.push({
                id: docs[i]._id,
                name: docs[i].name,
                description: docs[i].description,
                price: docs[i].price,
                image: docs[i].image,
                category: docs[i].category,
                quantity: items[i].quantity
            })
        }
        let extended = {};
        extended.sum = sum;
        extended.items = products;
        cb(extended);
    })
});

const Order = module.exports = mongoose.model('Order', OrderSchema);

