const express = require('express');
const router = express.Router();
const users = require('../controllers/users')

router.get('/:id', (req, res) => {
    users.findById(req, res);
});

router.getAll('/', (req, res) => {
    users.getAll(req, res);
});

router.delete('/:id', (req, res) => {
    users.delete(req, res);
});

module.exports = router;

