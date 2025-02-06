"use strict";

const express = require('express');
const router = express.Router();

const { getClientInvoices, getClientInvoiceById, createClientInvoice, scanBarcode, deleteClientInvoice, updateClientInvoice } = require('../controllers/client-invoice.controller');

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Invoice router is working' });
});

//READ ALL
router.get('/', getClientInvoices)

//READ BY ID
router.get('/:id', getClientInvoiceById)

//CREATE API
router.post('/', createClientInvoice)

//SCAN QR CODE API
router.post('/scan', scanBarcode)

//DELETE API
router.delete('/:id', deleteClientInvoice);

//UPDATE API
router.put('/:id', updateClientInvoice);

module.exports = router;