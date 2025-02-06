"use strict";

const express = require('express');
const router = express.Router();

const { getVendorInvoices, getVendorInvoiceById, createVendorInvoice, deleteVendorInvoice, updateVendorInvoice } = require('../controllers/vendor-invoice.controller');

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Invoice router is working' });
});

//READ ALL
router.get('/', getVendorInvoices)

//READ BY ID
router.get('/:id', getVendorInvoiceById)

//CREATE API
router.post('/', createVendorInvoice)

//DELETE API
router.delete('/:id', deleteVendorInvoice);

//UPDATE API
router.put('/:id', updateVendorInvoice);

module.exports = router;