"use strict";

const express = require('express');
const router = express.Router();

const { getInvoices, getInvoiceById, createInvoice, scanBarcode, deleteInvoice, updateInvoice } = require('../controllers/invoice.controller');

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Invoice router is working' });
});

//READ ALL
router.get('/', getInvoices)

//READ BY ID
router.get('/:id', getInvoiceById)

//CREATE API
router.post('/', createInvoice)

//SCAN QR CODE API
router.post('/scan', scanBarcode)

//DELETE API
router.delete('/:id', deleteInvoice);

//UPDATE API
router.put('/:id', updateInvoice);

module.exports = router;