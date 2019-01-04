var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var user_schema = mongoose.Schema({
    email: {
        type: String
    },
    pass: {
        type: String
    },
    full_name: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', user_schema);