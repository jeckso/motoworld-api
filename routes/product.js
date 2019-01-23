const express = require('express');
const router = express.Router();
const produtcs = require('../controllers/product');
var authController = require('../controllers/auth/local');
const app = express();
router.route('/')
    .post(authController.isAuthenticated, produtcs.create)
    .get(produtcs.getAll);


router.get('/:id', (req, res) => {
    produtcs.findById(req, res);
});


router.get('/', (req, res) => {
    produtcs.getAll(req, res);
});

router.put('/:id', (req, res) => {
    produtcs.update(req, res);
});


router.delete('/:id', (req, res) => {

    produtcs.delete(req, res);
});

module.exports = router;
