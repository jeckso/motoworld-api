var LocalStrategy = require('passport-local').Strategy;


module.exports.register = function(passport) {
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
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }
            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }
));