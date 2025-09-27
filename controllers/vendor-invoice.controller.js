"use strict";

const productModel = require('../models/product.model');
const vendorInvoiceModel = require('../models/vendor-invoice.model')
const vendorModel = require('../models/vendor.model')

const getVendorInvoices = async (req, res) => {
    try {
        const invoices = await vendorInvoiceModel.find();
        res.status(200).json(invoices)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getVendorInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoices = await vendorInvoiceModel.findById(id)

        if (!invoices) {
            return res.status(404).json({ message: "Invoice not found" })
        }

        res.status(200).json(invoices);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const createVendorInvoice = async (req, res) => {
    try {
        const { name, father_name, contact, cnic, product, quantity, pricePerUnit, totalPrice } = req.body;

        // Find vendor using Contact
        const vendor = await vendorModel.findOne({ contact: contact });

        const invoiceData = new vendorInvoiceModel({
            name,
            father_name,
            contact,
            cnic,
            product,
            quantity,
            pricePerUnit,
            totalPrice,
            vendor: vendor?._id || null,    // Use null if vendor not found
        });

        // Only push and save if vendor exists
        if (vendor) {
            await vendor.invoices.push(invoiceData._id);
            await vendor.save();
        }
        await invoiceData.save();

        //Update quantity of product
        const existingProduct = await productModel.findOne({ product_name: product })
        if (existingProduct) {
            existingProduct.stocked_qty += Number(quantity)
            await existingProduct.save()
        } else {
            const productData = new productModel({
                product_name: product,
                stocked_qty: quantity
            })
            await productData.save()
        }

        res.status(201).json({
            success: true
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateVendorInvoice = async (req, res) => {
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
        const result = await vendorInvoiceModel.findByIdAndUpdate(
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

const deleteVendorInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await vendorInvoiceModel.findByIdAndDelete(id)

        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        res.status(200).json({ message: "Invoice deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getVendorInvoices, getVendorInvoiceById, createVendorInvoice, deleteVendorInvoice, updateVendorInvoice }