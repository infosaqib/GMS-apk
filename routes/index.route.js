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
router.get('/product', function (req, res) {
  res.render('product');
});


//* Middlewares
router.use(bodyParser.json())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))




module.exports = router;
