"use strict";

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')


//* Database Connection
const connectDB = require('../db');
connectDB();


//* Routes
router.get('/', async function (req, res) {
res.send("hello world")
});


//* Middlewares
router.use(bodyParser.json())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

module.exports = router;
