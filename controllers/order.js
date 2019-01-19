const Order = require('../models/order');


function createOrderFromBody(body) {
    let order = {};
    order.description = body.description;
    order.delivery = body.delivery;
    order.products = body.products;
    order.date_of_creation = body.date_of_creation ? body.date_of_creation : Date();
    return order;
}

module.exports.create = (req, res) => {
    createOrderFromBody(req).save(err => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(new Order(createOrderFromBody(req.body)));
    });
};

module.exports.findById = (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.status(200).send(order);
        }
    });
};

module.exports.getAll = (req, res) => {
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
        });
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

