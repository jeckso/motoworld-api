const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var passport = require('passport');
var logger = require('morgan');
const config = require('./config/database');
var createError = require('http-errors');
var router = express.Router();

// Connect To Database (NEW) But not working!!!!!!!!!! (because of secret in db.js!!!!!)
//const db = require('./config/database');
// Map global promise - get rid of warning
//mongoose.Promise = global.Promise;
// Connect to mongoose
//mongoose.connect(db.mongoURI, {
//useMongoClient: true
//})
//.then(() => console.log('MongoDB Connected...'))
//.catch(err => console.log(err));


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
const users = require('./routes/users');
const product = require('./routes/product');
const category = require('./routes/category');
const Products = require('./models/product');
const Cart = require('./lib/Cart');
const Security = require('./lib/Security');
// Port Number
const store = new MongoDBStore({
    uri: config.db.url,
    collection: config.db.sessions
});
app.set('env', 'development');

app.locals.paypal = config.paypal;
app.locals.locale = config.locale;
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    unset: 'destroy',
    store: store,
    name: config.name + '-' + Security.generateId(),
    genid: (req) => {
        return Security.generateId()
    }
}));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);
app.use('/shop', product);
app.use('/shop', category);
// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
module.exports = app;