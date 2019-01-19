const bcrypt = require('bcryptjs');
const User = require('../models/category');

module.exports.createUser = function(newUser, salt, callback) {
    let currentSalt = salt ? salt : bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.email, currentSalt);
    newUser.save(callback);
};

module.exports.findById = (req, res) => {
    User.findById(req.params.id, (err, category) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.status(200).send(category);
        }
    });
};

module.exports.getAll = (req, res) => {
    User.find()
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

module.exports.delete = (req, res) => {
    User.findByIdAndRemove(req.id, (err, category) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.status(200).send(category);
        }
    });
};


