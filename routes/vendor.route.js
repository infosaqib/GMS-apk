"use strict";

const express = require('express');
const router = express.Router();

const { getVendors, getVendorById, createVendor, updateVendor, deleteVendor } = require('../controllers/vendor.controller');


//READ ALL
router.get('/', getVendors)

//READ BY ID
router.get('/:id', getVendorById)


//CREATE API
router.post('/', createVendor)

//UPDATE API
router.put('/:id', updateVendor)


//DELETE API
router.delete('/:id', deleteVendor);

module.exports = router;