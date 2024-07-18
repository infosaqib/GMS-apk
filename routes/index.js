var express = require('express');
var router = express.Router();
const productModel = require('../models/product');
const userModel = require('../models/users');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index')
});





router.post('/', async function (req, res) {
  const userData = await userModel({
    name: req.body.name,
    item_name: req.body.items,
    item_weight: req.body.weight,
    total_price: req.body.total
  })
  userData.save()
  res.redirect('/')
});


router.get('/product', function (req, res) {
  res.render('product');
});

router.post('/product', async function (req, res) {
  const productData = await productModel({
    product_name: req.body.productName,
    cleaning_price: req.body.cleaningPrice,
    granding_price: req.body.grandingPrice,
    total_price: req.body.totalPrice,
  })
   productData.save()
  res.redirect('/product')
});

module.exports = router;
