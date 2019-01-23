// Load required packages

var bcrypt = require('bcrypt-nodejs');
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
    User.find({"username":req.body.username}, function (err, user){

        if (err) {
            return res.status(500).send(err);
        }
        else if(user[0] == null) return res.status(500).send("No such user");
        else {

            bcrypt.compare(req.body.password, user[0].password,function(err, isMatch) {
                if (err) { return res.status(500).send(err); }
// Password did not match
                if (!isMatch) { return res.status(500).send("Wrong password"); }

                // Success
                return res.status(200).json({"token":'Basic '+Buffer.from(req.body.username+":"+req.body.password).toString('base64'),"_id":user[0]._id});
            });

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
    if(req.params._id==="5c476ef846e5e378fc702415"){
    User.find(function(err, users) {
        if (err)
            return res.send(err);

        res.json(users);
    });}
    else return res.code(401).send("Forbidden");
};