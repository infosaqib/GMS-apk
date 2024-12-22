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
router.get('/profiles', function (req, res) {
  res.render('profile');
});
router.get('/scan', function (req, res) {
  res.render('qr_scanner');
});


//* Middlewares
router.use(bodyParser.json())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))




module.exports = router;
