var crypto = require('crypto');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ClientSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    clientId: {
        type: String,
        unique: true,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    }
});
const Client = module.exports = mongoose.model('Client', ClientSchema);
