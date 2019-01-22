const express = require('express');

    redirect = require("express-redirect");
var app = express();
redirect(app); // mount the plugin
const router = express.Router();
var authController = require('../controllers/auth/local');
router.get('/', (req, res) => {
    authController.CodePost(req,res);
    console.log(res);

});

module.exports = router;