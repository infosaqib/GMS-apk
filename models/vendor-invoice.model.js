const mongoose = require('mongoose');

const vendorInvoiceSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    },
    name: {
        type: String,
        required: true,
      },
      father_name: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
      },
      cnic: {
        type: String,
        required: true,
      },
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('vendor-invoice', vendorInvoiceSchema);
