const express = require('express');
const router = express.Router();
const orders = require('../controllers/order')

route.post('/:id', (req, res) => {
    orders.create(req, res);
});

route.get('/:id', (req, res) => {
    orders.findById(req, res);
});

route.getAll('/', (req, res) => {
    orders.getAll(req, res);
});

route.get('/:id', (req, res) => {
    orders.update(req, res);
});

route.get('/:id', (req, res) => {
    orders.delete(req, res);
});

