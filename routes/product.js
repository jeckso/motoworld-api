const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
router.post('/product', (req, res, next) => {
        let newProduct = new Product({

            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            date_of_creation: req.body.date_of_creation,
            }
        );
Product.addProduct(newProduct,(err,product)=> {
    if(err) {
        res.json({success: false, msg: 'Failed to register product'});
    } else {
        res.json({success: true, msg: 'Product registered'});
    }
});

    }
)
module.exports = router;