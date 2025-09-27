"use strict";

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')


//* Database Connection
const connectDB = require('../db');
const clientInvoiceModel = require('../models/client-invoice.model');
const vendorInvoiceModel = require('../models/vendor-invoice.model');
const clientModel = require('../models/client.model');
const vendorModel = require('../models/vendor.model');
const productModel = require('../models/product.model');
connectDB();


//* Routes
router.get('/', async function (req, res) {
  try {
    // Run all queries concurrently to improve performance
    const [
      clients,
      vendors,
      products,
      totalSalesValue,
      totalSales,
      totalPurchasesValue,
      totalPurchases
    ] = await Promise.all([
      clientModel.countDocuments(),
      vendorModel.countDocuments(),
      productModel.countDocuments(),
      clientInvoiceModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$total_price' }
          }
        }
      ]),
      clientInvoiceModel.countDocuments(),
      vendorInvoiceModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$totalPrice' }
          }
        }
      ]),
      vendorInvoiceModel.countDocuments()
    ]);

    // Extract totals or set default value
    const totalProfit = totalSalesValue[0]?.total || 0;
    const totalSpending = totalPurchasesValue[0]?.total || 0;

    // Render the view
    return res.render('index', {
      clients,
      vendors,
      products,
      totalProfit,
      totalSales,
      totalSpending,
      totalPurchases
    });
  } catch (error) {
    // Error handling
    console.error('Error occurred:', error);
  return res.status(500).send('Something went wrong. Please try again later.');
  }
});


router.get('/invoices', async function (req, res) {
  try {
    // Fetch clients and vendors
    const clientInvoices = await clientInvoiceModel.find();
    const vendorInvoices = await vendorInvoiceModel.find();
  return res.render("invoice", { clientInvoices, vendorInvoices });

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
router.get('/products', function (req, res) {
  return res.render('product');
});
router.get('/tracking', function (req, res) {
  return res.render('tracking');
});

router.get("/clients", async function (req, res) {
  try {
    const clients = await clientModel.find(); // Fetch all users
    return res.render("client", { clients });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get('/clients/client-profile', function (req, res) {
  return res.render('clientProfile');
});
router.get('/vendors', async function (req, res) {
  try {
    const vendors = await vendorModel.find(); // Fetch all users
    return res.render("vendor", { vendors });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
router.get('/vendors/vendor-profile', function (req, res) {
  return res.render('vendorProfile');
});
router.get('/scan', function (req, res) {
  return res.render('qr_scanner');
});


//* Middlewares
router.use(bodyParser.json())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))




module.exports = router;
