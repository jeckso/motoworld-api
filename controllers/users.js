var User = require('../model/user');
var bcrypt = require('bcryptjs');

module.exports.createUser = function(newUser, salt, callback) {
    let currentSalt = salt ? salt : bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.email, currentSalt);
    newUser.save(callback);
};