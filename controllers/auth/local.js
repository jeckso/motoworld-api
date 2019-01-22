// Load required packages

var passport = require('passport');
var request = require('request');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../../models/user');
var Client = require('../../models/client');
var Token = require('../../models/token');

passport.use(new BasicStrategy(
    function (username, password, callback) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return callback(err);
            }

            // No user found with that username
            if (!user) {
                return callback(null, false);
            }

            // Make sure the password is correct
            user.verifyPassword(password, function (err, isMatch) {
                if (err) {
                    return callback(err);
                }

                // Password did not match
                if (!isMatch) {
                    return callback(null, false);
                }

                // Success
                return callback(null, user);
            });
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    function (username, password, callback) {
        Client.findOne({id: username}, function (err, client) {
            if (err) {
                return callback(err);
            }

            // No client found with that id or bad password
            if (!client || client.secret !== password) {
                return callback(null, false);
            }

            // Success
            return callback(null, client);
        });
    }
));

passport.use(new BearerStrategy(
    function (accessToken, callback) {
        Token.findOne({value: accessToken}, function (err, token) {
            if (err) {
                return callback(err);
            }

            // No token found
            if (!token) {
                return callback(null, false);
            }

            User.findOne({_id: token.userId}, function (err, user) {
                if (err) {
                    return callback(err);
                }

                // No user found
                if (!user) {
                    return callback(null, false);
                }

                // Simple example with no scope
                callback(null, user, {scope: '*'});
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], {session: false});
exports.isClientAuthenticated = passport.authenticate('client-basic', {session: false});
exports.isBearerAuthenticated = passport.authenticate('bearer', {session: false});

module.exports.CodePost = (req, res,callback) => {

       var jsonObj = {
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://motoworld.me/api2/'
    };
    // res.render('callback', { Code: req.query.code, user: req.user, client: req.oauth2.client });
    // console.log(jsonObj.code);
    // request.post({
    //     headers: {
    //         'content-type': 'application/json',
    //         'Authorization': 'Basic bW90b3dvcmxkOnRvcHNlY3JldA=='
    //     },
    //     json: true,
    //     url: 'http://motoworld.me/api/oauth2/token',
    //     body: jsonObj
    // }, function (error, response, body) {


        res.setHeader('Authorization', 'Bearer '+ body.access_token.value);
        res.setHeader('userId', body.access_token.userId);
        res.redirect('http://motoworld.me/success');

    // });


};







