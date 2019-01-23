const Order = require('../models/order');
const products = require('../controllers/product');
const Product = require('../models/product');

function createOrderFromBody(body) {
    let order = {};
    order.user_id = body.user_id;
    order.description = body.description;
    order.delivery = body.delivery;
    order.items = body.items;
    order.products = body.products;
    order.date_of_creation = body.date_of_creation ? body.date_of_creation : Date();
    return order;
}

function createOrderFromBodyAsync(body, callback) {
    let order = {};
    order.user_id = body.user_id;
    order.description = body.description;
    order.delivery = body.delivery;
    order.items = body.items;
    order.products = body.products;
    order.date_of_creation = body.date_of_creation ? body.date_of_creation : Date();
    Product.findAll(order.items.map(i => i.id), p => {
        let sum = 0;
        for (let i in p) {
            sum += p[i].price * order.items[i].quantity;
        }
        order.sum = sum;
        callback(order)
    });
}

module.exports.create = (req, res) => {
    createOrderFromBodyAsync(req.body, orderBody => {
        const order = new Order(orderBody);
        order.save(err => {
            if (err) return res.status(500).send(err);
            else return res.status(201).send(order);
            // products.findByIdSync(req.body.items, sum => {
            //
            // });
        });
    });
   // Product.findById(idprod,(err, product) => {
   //     if (err) {
   //         return "fuck you"
   //     } else {
   //         return console.log(product.price);
   //     }
   // });
   //  console.log(req.body.items);


    // order.items.forEach(item =>
    //
    //     // Product.findById(item.get("id"),(err, product) => {
    //     //     if (err) {
    //     //         return "fuck you"
    //     //     } else {
    //     //         return product.price;
    //     //     }
    //     // })
    //
    // );
    // order.items.forEach(item => console.log(item.get("id") + " " + item.get("quantity")));


};

module.exports.findById = (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            if (!order) {
                return res.status(404).send({});
            }
            order.getSum((extended) => {
                res.status(200).send({order: order, extended: extended});
            })
        }
    });
};

module.exports.getAll = (req, res) => {
    if(req.params._id==="5c476ef846e5e378fc702415"){
    Order.find()
        .select()
        .limit(req.query.pageSize)
        .skip(req.query.page * req.query.pageSize)
        .sort({
            date_of_creation: 'asc'
        })
        .exec((err, orders) => {
            if (err) {
                return res.status(500).send(err)
            } else {
                return res.status(200).send(orders);
            }
        });}
    else return res.status(401).send("Forbidden");
};

module.exports.update = (req, res) => {
    Order.findByIdAndUpdate(
        req.params.id,
        createOrderFromBody(req.body),
        (err, order) => {
            if (err) {
                return res.status(500).send(err)
            } else {
                return res.status(200).send(order);
            }
        });
};

module.exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.id, (err, order) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.status(200).send(order);
        }
    });
};

