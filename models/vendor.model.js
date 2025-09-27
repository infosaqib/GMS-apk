const { format } = require("morgan");
const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
    {
        name: {
            type: String,

        },
        fatherName: {
            type: String,

        },
        contact: {
            type: String,
            unique: true
        },
        cnic: {
            type: String,
            unique: true
        },
        invoices: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'invoice'
        }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Vendor", vendorSchema);
