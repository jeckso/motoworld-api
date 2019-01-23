const express = require('express');
const path = require('path');
var request = require('request');
var redirect = require("express-redirect");
var session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
var ejs = require('ejs');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('morgan');
const config = require('./config/database');
const fileUpload = require('express-fileupload');
const user = require('./routes/user');
const client = require('./routes/client');
const order = require('./routes/order');
const products = require('./routes/product');
const categories = require('./routes/category');
const oauth2 = require('./routes/oauth2');
// const image = require('./routes/image');
// const oauth = require('./lib/image');

var userController = require('./controllers/user');
var authController = require('./controllers/auth/local');
var oauth2Controller = require('./controllers/oauth2');
var clientController = require('./controllers/client');
var beerController = require('./controllers/beer');
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
redirect(app);
app.set('view engine', 'ejs');
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
app.use(logger('dev'));
app.use(express.json());
app.use(fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 },
}));
// Set Static Folder


// Body Parser Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));
// Passport Middleware
app.use(passport.initialize());

var router = express.Router();
// Create endpoint handlers for /beers
router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);
router.route('/users/login')
    .post(userController.loginUsers);
// Create endpoint handlers for /clients
router.route('/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);


// Register all our routes with /api


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
// app.use('/image', image);
app.use('/api2',oauth2);
app.use('/api', router);
app.use('/clients', client);
app.use('/orders', order);
app.use('/users',user);
app.use('/categories', categories);
app.use('/products', products);

module.exports = app;
