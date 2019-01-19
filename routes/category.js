const express = require('express');
const router = express.Router();
const categories = require('../controllers/category')
const products = require('../controllers/product')

router.post('/:id', (req, res) => {
    categories.create(req, res);
});

router.get('/:id', (req, res) => {
    categories.findById(req, res);
});

router.get('/:category_id/products', (req, res) => {
    products.getByProductId(req, res);
});

router.get('/', (req, res) => {
    categories.getAll(req, res);
});

router.put('/:id', (req, res) => {
    categories.update(req, res);
});

router.delete('/:id', (req, res) => {
    categories.delete(req, res);
});

module.exports = router;
