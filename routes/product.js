const express = require('express');
const router = express.Router();
const produtcs = require('../controllers/product');
var authController = require('../controllers/auth/local');

router.get('/:id', (req, res) => {
    produtcs.findById(req, res);
});

router.get('/', (req, res) => {
    produtcs.getAll(req, res);
});

router.put('/:id', authController.isAuthenticated, produtcs.update);
router.post('/', authController.isAuthenticated, produtcs.create);
router.delete('/:id', authController.isAuthenticated, produtcs.delete);

module.exports = router;
