const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const user = require('./routes/user');
const order = require('./routes/order');
const products = require('./routes/product');
const categories = require('./routes/category');
// Connect To Database (OLD CODE)
mongoose.connect(config.database, {useMongoClient: true});
// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to Database ' + config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});
const app = express();
app.locals.paypal = config.paypal;
app.locals.locale = config.locale;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('env', 'development');
// Port Number
app.locals.paypal = config.paypal;
app.locals.locale = config.locale;
const port = process.env.PORT || 8080;
// CORS Middleware
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(__dirname + '/public'));
app.use(express.json());
// Set Static Folder

// Body Parser Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Passport Middleware
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
    });
}
app.use((err, req, res, next) => {
    res.status(err.status || 500);
});
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
app.use('/users', user);
app.use('/orders', order);
app.use('/categories', categories);
app.use('/products', products);
module.exports = app;
