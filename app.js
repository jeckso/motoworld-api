const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('morgan');
const config = require('./config/database');
const oauth2 = require('./lib/auth/oauth2');
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
//Oauth
app.use(passport.initialize());

require('./lib/auth/auth');

app.post('/oauth/token', oauth2.token);

app.get('/api/userInfo',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`.  It is typically used to indicate a scope of the token,
        // and used in access control checks.  For illustrative purposes, this
        // example simply returns the scope in the response.
        res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
    }
);
//End
app.locals.paypal = config.paypal;
app.locals.locale = config.locale;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('env', 'development');

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
// app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(express.json());
// Set Static Folder


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

app.get('/cart', (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    res.render('cart', {
        pageTitle: 'Cart',
        cart: cart,
        nonce: Security.md5(req.sessionID + req.headers['user-agent'])
    });
});

app.get('/cart/remove/:id/:nonce', (req, res) => {
    let id = req.params.id;
    if(/^\d+$/.test(id) && Security.isValidNonce(req.params.nonce, req)) {
        Cart.removeFromCart(parseInt(id, 10), req.session.cart);
        res.redirect('/cart');
    } else {
        res.redirect('/');
    }
});

app.get('/cart/empty/:nonce', (req, res) => {
    if(Security.isValidNonce(req.params.nonce, req)) {
        Cart.emptyCart(req);
        res.redirect('/cart');
    } else {
        res.redirect('/');
    }
});

app.post('/cart', (req, res) => {
    let qty = parseInt(req.body.qty, 10);
    let product = parseInt(req.body.product_id, 10);
    if(qty > 0 && Security.isValidNonce(req.body.nonce, req)) {
        Products.findOne({product_id: product}).then(prod => {
            let cart = (req.session.cart) ? req.session.cart : null;
            Cart.addToCart(prod, qty, cart);
            res.redirect('/cart');
        }).catch(err => {
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

app.post('/cart/update', (req, res) => {
    let ids = req.body["product_id[]"];
    let qtys = req.body["qty[]"];
    if(Security.isValidNonce(req.body.nonce, req)) {
        let cart = (req.session.cart) ? req.session.cart : null;
        let i = (!Array.isArray(ids)) ? [ids] : ids;
        let q = (!Array.isArray(qtys)) ? [qtys] : qtys;
        Cart.updateCart(i, q, cart);
        res.redirect('/cart');
    } else {
        res.redirect('/');
    }
});

app.get('/checkout', (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    res.render('checkout', {
        pageTitle: 'Checkout',
        cart: cart,
        checkoutDone: false,
        nonce: Security.md5(req.sessionID + req.headers['user-agent'])
    });
});

app.post('/checkout', (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    if(Security.isValidNonce(req.body.nonce, req)) {
        res.render('checkout', {
            pageTitle: 'Checkout',
            cart: cart,
            checkoutDone: true
        });
    } else {
        res.redirect('/');
    }
});


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
