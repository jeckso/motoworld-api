const express = require('express');
const router = express.Router();
const passport = require('passport');
const app = express();
var authController = require('../controllers/auth/local');
const orders = require('../controllers/order');



// router.post('/', (req, res) => {
//
//     orders.create(req, res);
//
// });
router.get('/', authController.isAuthenticated,orders.getAll);

router.get('/:id', authController.isAuthenticated, orders.findById);

app.post('/',authController.isAuthenticated, orders.create);

router.put('/:id', authController.isAuthenticated, orders.update);
router.delete('/:id', authController.isAuthenticated, orders.delete);

module.exports = router;

