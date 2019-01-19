var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../users');

const credentials = {
    clientID: "619888358451066",
    clientSecret: "8d6738cd39b1814ec30b48f93ef0f188",
    callbackURL: "http://www.example.com/auth/google/callback",
    profileFields: ['id', 'displayName', 'email']
};

module.exports = function(passport) {
    passport.use(new FacebookStrategy(
        credentials,
        function(accessToken, refreshToken, profile, cb) {
            let user = {
                email: profile.email,
                full_name: profile.profileFields
            };
            User.createUser(user, profile.id, function (err, user) {
                return cb(err, user);
            });
        })
    );
};