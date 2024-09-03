var express = require('express');
var router = express.Router();

//Import Models
const productModel = require('../models/product');
const userModel = require('../models/users');

//* Database Connection
const connectDB = require('../db');
connectDB();





//! R O U T E S



//? index route
router.get('/', function (req, res) {
  res.render('index')
});





router.post('/', async function (req, res) {
  try {
    const userData = await userModel({
      name: req.body.name,
      item_name: req.body.items,
      item_weight: req.body.remaining,
      total_price: req.body.total
    })
    userData.save()
    res.redirect('/')
    // res.status(200).json(userData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

//? Product route

router.get('/product', function (req, res) {
  res.render('product');
});


router.get('/product/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await productModel.findOneAndDelete({ _id: productId })
  res.json(product)

});

router.post('/product', async function (req, res) {
  try {
    const productData = await productModel({
      product_name: req.body.productName,
      cleaning_price: req.body.cleaningPrice,
      granding_price: req.body.grandingPrice,
      total_price: req.body.totalPrice,
    })
    productData.save()
    res.redirect('/product')
  } catch (error) {
    if (error.code === 1100) {
      res.sendStatus(400, "Product with this name already exists")
      alert('Product with this name already exists')
    } else {
      res.status(500).json({ message: error.message })
    }
  }
});

// router.delete('/product/:id', (req, res) => {
//   const productId = req.params.id
//   db.collection('products').deleteOne({ _id: ObjectId(productId) }, (err, result) => {
//     if (err) {
//       console.error('Failed to delete product:', err)
//       return res.status(500).send('Failed to delete product')
//     } else if (result.deletedCount === 0) {
//       console.warn('No product found with ID: ', productId)
//       return res.status(404).send('Product not found')
//     }
//     res.sendStatus(200);
//   })
// })


//Middleware
router.use(express.json())


module.exports = router;
