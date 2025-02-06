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
connectDB();


//* Routes
router.get('/', async function (req, res) {
  try {
    // Fetch clients and vendors
    const clientInvoices = await clientInvoiceModel.find(); 
    const vendorInvoices = await vendorInvoiceModel.find(); 
    res.render("index", { clientInvoices, vendorInvoices });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get('/products', function (req, res) {
  res.render('product');
});
router.get('/tracking', function (req, res) {
  res.render('tracking');
});

router.get("/clients", async function (req, res) {
  try {
    const clients = await clientModel.find(); // Fetch all users
    res.render("client", { clients });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/clients/client-profile', function (req, res) {
  res.render('clientProfile');
});
router.get('/vendors', async function (req, res) {
  try {
    const vendors = await vendorModel.find(); // Fetch all users
    res.render("vendor", { vendors });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get('/vendors/vendor-profile', function (req, res) {
  res.render('vendorProfile');
});
router.get('/scan', function (req, res) {
  res.render('qr_scanner');
});


//* Middlewares
router.use(bodyParser.json())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))




module.exports = router;
