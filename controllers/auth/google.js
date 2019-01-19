var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../users');

const credentials = {
    clientID: "222883819559-kn6puk7egmkkv5p8kfetaek1tfu8lt19.apps.googleusercontent.com",
    clientSecret: "osHVUyC3MZ8-8PiJgrRqrdZG",
    callbackURL: "http://www.example.com/auth/google/callback"
};

module.exports = function(passport) {
    passport.use(new GoogleStrategy(
        credentials,
        function(accessToken, refreshToken, profile, cb) {
            let user = {
                email: profile.emails[0],
                full_name: profile.familyName + " " + profile.givenName
            };
            User.createUser(user, profile.id, function (err, user) {
                return cb(err, user);
            });
        })
    );
};
