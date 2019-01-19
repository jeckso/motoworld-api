const Product = require('../models/product');

function createBodyFromBody(body) {
    let product = {};
    product.name = body.name;
    product.description = body.description;
    product.price = body.price;
    product.image = body.image;
    product.category = body.category;
    product.date_of_creation = body.date_of_creation ? body.date_of_creation : Date();
    return product;
}

module.exports.create = (req, res) => {
    let product = new Product(createBodyFromBody(req));
    product.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(new Product(product));
    });
};

module.exports.findById = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.status(200).send(product);
        }
    });
};

module.exports.getByProductId = (req, res) => {
    Product.find()
        .select()
        .where('category', req.category_id)
        .sort({ name: 'asc' })
        .exec((err, products) => {
            if (err) {
                return res.status(500).send(err)
            } else {
                return res.status(200).send(products);
            }
        });
};

module.exports.getAll = (req, res) => {
    Product.find()
        .select()
        .sort({ name: 'asc' })
        .exec((err, product) => {
            if (err) {
                return res.status(500).send(err)
            } else {
                return res.status(200).send(product);
            }
        });
};

module.exports.update = (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        createBodyFromBody(req.body),
        (err, product) => {
            if (err) {
                return res.status(500).send(err)
            } else {
                return res.status(200).send(product);
            }
        });
};

module.exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.id, (err, product) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.status(200).send(product);
        }
    });
};

