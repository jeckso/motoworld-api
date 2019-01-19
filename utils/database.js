var mongoose = require('mongoose');
const connectUrl = "mongodb://admin:admin123@ds123136.mlab.com:23136/motoworld";
mongoose.connect(connectUrl);
mongoose.Promise = global.Promise;

var database = module.exports = mongoose.connection;

database.on('error', console.error.bind(console, 'Mongo db connection error'));