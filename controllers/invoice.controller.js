"use strict";

const Invoice = require('../models/invoice.model')

const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoices = await Invoice.findById(id)

        if (!invoices) {
            return res.status(404).json({ message: "Invoice not found" })
        }

        res.status(200).json(invoices);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//This is the controller function for creating an invoice, you can add implemnetation code of qr code here
const createInvoice = async (req, res) => {
    try {

        const { name, father_name, contact, cnic, items, remaining, total } = req.body
        const invoiceData = new Invoice({
            name,
            father_name,
            contact,
            cnic,
            item_name: items,
            item_weight: remaining,
            total_price: total
        })
        await invoiceData.save()

        // Generate QR Code
        await invoiceData.generateQRCode();

        res.status(201).json({
            message: 'Invoice created successfully',
            invoice: invoiceData,
            qr_code: invoiceData.qr_code
        });

        // res.redirect('http://localhost:3000/')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const scanQRCode = async (req, res) => {
    try {
        const { qr_data } = req.body;
        const updatedInvoice = await Invoice.updateStatusByQRCode(qr_data);

        res.status(200).json({
            message: 'Invoice status updated successfully',
            invoice: updatedInvoice
        });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateInvoice = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validate ObjectId format
    // if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
    //     return res.status(400).json({
    //         message: 'Invalid invoice ID format',
    //         details: `ID ${invoiceId} is not a valid MongoDB ObjectId`
    //     });
    // }

    try {
        const result = await Invoice.findByIdAndUpdate(
            id, { status }, { new: true }
        );

        if (!result) {
            console.log(`Invoice not found with ID: ${invoiceId}`);
            return res.status(404).json({
                message: 'Invoice not found',
                details: `No invoice exists with ID ${invoiceId}`
            });
        }

        console.log('Invoice updated successfully:', result);
        return res.status(200).json({
            message: 'Status updated successfully',
            invoice: result
        });
    } catch (error) {
        console.error("Error updating invoice status:", error);
        return res.status(500).json({
            message: 'Internal Server Error',
            details: error.message
        });
    }
};

const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findByIdAndDelete(id)

        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        res.status(200).json({ message: "Invoice deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getInvoices, getInvoiceById, createInvoice, scanQRCode, deleteInvoice, updateInvoice }