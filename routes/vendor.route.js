"use strict";

const express = require('express');
const router = express.Router();

const { getVendorProfiles, getVendorProfileById, createVendorProfile, updateVendorProfile, deleteVendorProfile } = require('../controllers/vendor.controller');


//READ ALL
router.get('/', getVendorProfiles)

//READ BY ID
router.get('/:id', getVendorProfileById)


//CREATE API
router.post('/', createVendorProfile)

//UPDATE API
router.put('/:id', updateVendorProfile)


//DELETE API
router.delete('/:id', deleteVendorProfile);

module.exports = router;