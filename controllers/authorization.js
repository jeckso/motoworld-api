var passport = require('passport');
var googleAuth = require('./auth/google');
var facebookAuth = require('./auth/facebook');

googleAuth(passport);
facebookAuth(passport);

module.exports.facebookAuth = () => passport.authenticate("facebook");
module.exports.facebookAuthCallback = () => passport.authenticate('facebook', { failureRedirect: '/login' });

module.exports.googleAuth = () => passport.authenticate('google', { scope: ['profile'] });
module.exports.googleAuthCallback = () => passport.authenticate('google', { failureRedirect: '/login' });
