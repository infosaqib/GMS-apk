"use strict";

const express = require('express');
const router = express.Router();


//* Routes
router.get('/', async function (req, res) {
    res.send("hello world")
});


module.exports = router;
