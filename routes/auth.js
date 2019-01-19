var controller = require('../controllers/authorization');
var express = require('express');
var router = express.Router();

router.get('/google', controller.googleAuth());
router.get('/google/callback', controller.googleAuthCallback());

router.get('/facebook', controller.facebookAuth());
router.get('/facebook/callback', controller.facebookAuthCallback());

module.exports = router;