// Load required packages
var Order = require('../models/order');
var User = require('../models/user');
module.exports.getByUserId = (req, res) => {
    Order.find()
        .select()
        .where('user_id', req.params.id)
        .sort({ name: 'asc' })
        .exec((err, orders) => {
            if (err) {
                return res.status(500).send(err)
            } else {
                return res.status(200).send(orders);
            }
        });
};
exports.loginUsers = function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    User.findById(req.body.username, (err, user) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            //if(Use)  // return res.status(200).send(category);
        }
    });

};
// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function(err) {
        if (err)
            return res.send(err);

        res.json({ message: 'User has been successfully created! ' });
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err)
            return res.send(err);

        res.json(users);
    });
};