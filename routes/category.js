const express = require('express');
const router = express.Router();
var authController = require('../controllers/auth/local');
const categories = require('../controllers/category');
const products = require('../controllers/product');
router.route('/clients')
    .post(authController.isAuthenticated, categories.create);

router.get('/:id', (req, res) => {
    categories.findById(req, res);
});

router.get('/:category_id/products', (req, res) => {
    products.getByProductId(req, res);
});

router.get('/', (req, res) => {
    categories.getAll(req, res);
});

router.put('/:id', authController.isAuthenticated, categories.update);
router.post('/', authController.isAuthenticated, categories.create);
router.delete('/:id', authController.isAuthenticated, categories.delete);

module.exports = router;
