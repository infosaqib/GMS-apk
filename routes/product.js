var express = require('express');
var router = express.Router();
const product = require('../models/product');

router.get('/', async (req, res) => {
    try {
        const products = await product.find();
        res.json(products);

    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;