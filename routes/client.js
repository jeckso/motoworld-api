const express = require('express');
const router = express.Router();
const users = require('../controllers/client');
router.post('/oauth',(req,res) => {
    users.createClient(req,res);
});
module.exports = router;