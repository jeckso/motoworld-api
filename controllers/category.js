const Category = require('../models/category');

function createCategoryFromBody(body) {
    let category = {};
    category.name = body.name;
    category.date_of_creation = body.date_of_creation ? body.date_of_creation : Date();
    return category;
}

module.exports.create = (req, res) => {
    let category = new Category(createCategoryFromBody(req));
    category.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(new Category(category));
    });
};

module.exports.findById = (req, res) => {
    Category.findById(req.params.id, (err, category) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.status(200).send(category);
        }
    });
};

module.exports.getAll = (req, res) => {
    Category.find()
        .select()
        .sort({ name: 'asc' })
        .exec((err, categories) => {
            if (err) {
                return res.status(500).send(err)
            } else {
                return res.status(200).send(categories);
            }
        });
};

module.exports.update = (req, res) => {
    Category.findByIdAndUpdate(
        req.params.id,
        createCategoryFromBody(req.body),
        (err, category) => {
            if (err) {
                return res.status(500).send(err)
            } else {
                return res.status(200).send(category);
            }
        });
};

module.exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.id, (err, category) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.status(200).send(category);
        }
    });
};

