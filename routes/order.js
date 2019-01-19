const express = require('express');
const router = express.Router();
const orders = require('../controllers/order')

router.post('/:id', (req, res) => {
    orders.create(req, res);
});

router.get('/:id', (req, res) => {
    orders.findById(req, res);
});

router.getAll('/', (req, res) => {
    orders.getAll(req, res);
});

router.put('/:id', (req, res) => {
    orders.update(req, res);
});

router.delete('/:id', (req, res) => {
    orders.delete(req, res);
});

module.exports = router;

