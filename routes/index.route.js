"use strict";

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')


//* Database Connection
const connectDB = require('../db');
connectDB();


//* Routes
router.get('/', function (req, res) {
  res.render('index')
});
router.get('/products', function (req, res) {
  res.render('product');
});
router.get('/tracking', function (req, res) {
  res.render('tracking');
});
router.get('/clients', function (req, res) {
  res.render('client');
});
router.get('/clients/client-profile', function (req, res) {
  res.render('clientProfile');
});
router.get('/vendors', function (req, res) {
  res.render('vendor');
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
