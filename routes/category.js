const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
router.post('/category', (req, res, next) => {
        let newCategory = new Category({
            name: req.body.name,
            date_of_creation: req.body.date_of_creation,
            }
        );
        Category.addCategory(newCategory,(err,product)=> {
            if(err) {
                res.json({success: false, msg: 'Failed to register category'});
            } else {
                res.json({success: true, msg: 'Category registered'});
            }
        });

    }
)
module.exports = router;