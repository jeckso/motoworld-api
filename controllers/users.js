const User = require('../models/user');


module.exports.createUser =  (req, res) => {
        let user = new User({ username: req.body.username, password: req.body.password });
    user.save(function(err, user) {
        if(err) return res.status(500).send(err);
        else res.status(200).send(user);
    });
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


