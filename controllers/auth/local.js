var LocalStrategy = require('passport-local').Strategy;

module.exports.register = function (passport) {
    passport.use(new LocalStrategy(
        function (email, password, done) {
            User.getUserByEmail(email, function (err, user) {
                if (err) throw err;
                if (!user) {
                    return done(null, false, {message: 'Unknown User'});
                }
                User.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Invalid password'});
                    }
                });
            });
        })
    );
};