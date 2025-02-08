"use strict";

const clientInvoiceModel = require('../models/client-invoice.model')
const productModel = require('../models/product.model')
const clientModel = require('../models/client.model')

const getClientInvoices = async (req, res) => {
  try {
    const invoices = await clientInvoiceModel.find();
    res.status(200).json(invoices)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getClientInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoices = await clientInvoiceModel.findById(id)

    if (!invoices) {
      return res.status(404).json({ message: "Invoice not found" })
    }

    res.status(200).json(invoices);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const createClientInvoice = async (req, res) => {
  try {
    const { name, father_name, contact, cnic, items, cutting, remaining, total } = req.body;

    // Find client using contact
    const client = await clientModel.findOne({ contact: contact });

    const invoiceData = new clientInvoiceModel({
      name,
      father_name,
      contact,
      cnic,
      item_name: items,
      item_weight: remaining,
      total_price: total,
      client: client?._id || null,    // Use null if client not found
    });

    // Only push and save if client exists
    if (client) {
      await client.invoices.push(invoiceData._id);
      await client.save();
    }
    await invoiceData.save();

    // Update product stock (add cutting weight to stocked_qty)
      let productToUpdate = items === "Gandam" ? "Floor" : items;

      // Update product stock (add cutting weight to stocked_qty)
      const product = await productModel.findOne({ product_name: productToUpdate });
    if (product) {
      product.stocked_qty += Number(cutting); // Add cutting weight to stocked_qty
      await product.save();
    } else {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Generate Barcode
    await invoiceData.generateBarcode();

    res.status(201).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const scanBarcode = async (req, res) => {
  try {
    const { barcode_data } = req.body;

    if (!barcode_data) {
      return res.status(400).json({
        success: false,
        message: 'Barcode data is required'
      });
    }

    const invoice = await clientInvoiceModel.findById(barcode_data);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    const statusProgression = ["Ordered", "Working", "Packed", "Delivered"];
    const currentIndex = statusProgression.indexOf(invoice.status);

    if (currentIndex < statusProgression.length - 1) {
      invoice.status = statusProgression[currentIndex + 1];
      await invoice.save();
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      currentStatus: invoice.status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating status',
      error: error.message
    });
  }
};
// const scanQRCode = async (req, res) => {
//     try {
//         const { qr_data } = req.body;

//         // Validate input
//         if (!qr_data) {
//             return res.status(400).json({ 
//                 message: 'QR code data is required' 
//             });
//         }

//         // Extract invoice ID from QR data 
//         const invoiceId = JSON.parse(qr_data).invoice_id;

//         // Find the invoice
//         const invoice = await Invoice.findOne({ id: invoiceId });

//         if (!invoice) {
//             return res.status(404).json({ 
//                 message: 'Invoice not found' 
//             });
//         }

//         // Status progression
//         const statusProgression = [
//             "Processing", 
//             "Ordered", 
//             "Shipped", 
//             "Delivered", 
//             "Completed"
//         ];

//         // Find current status index
//         const currentIndex = statusProgression.indexOf(invoice.status);

//         // Move to next status if not at the end
//         if (currentIndex < statusProgression.length - 1) {
//             invoice.status = statusProgression[currentIndex + 1];
//             await invoice.save();
//         }

//         // Respond with updated invoice
//         res.status(200).json({
//             message: 'Invoice status updated successfully',
//             invoice: {
//                 id: invoice.id,
//                 name: invoice.name,
//                 item_name: invoice.item_name,
//                 previous_status: statusProgression[currentIndex],
//                 current_status: invoice.status
//             }
//         });
//     } catch (error) {
//         console.error('QR Code Scan Error:', error);
//         res.status(500).json({ 
//             message: 'Error processing QR code',
//             error: error.message 
//         });
//     }
// };

const updateClientInvoice = async (req, res) => {
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
    const result = await clientInvoiceModel.findByIdAndUpdate(
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

const deleteClientInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await clientInvoiceModel.findByIdAndDelete(id)

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({ message: "Invoice deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getClientInvoices, getClientInvoiceById, createClientInvoice, scanBarcode, deleteClientInvoice, updateClientInvoice }