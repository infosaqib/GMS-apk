const mongoose = require('mongoose');
const bwipjs = require('bwip-js');

//* Database Connection
const connectDB = require('../db');
connectDB();
//? Schema
const generateUniqueId = () => {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  const uniqueId = (timestamp + randomNum).slice(-7); // Ensure the ID is 7 digits long
  return uniqueId;
};


const ClientinvoiceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: generateUniqueId
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
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
    },
    item_name: {
      type: String,
      required: true,
    },
    item_weight: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Ordered",
      enum: ["Ordered", "Working", "Packed", "Delivered"]
    },
    barcode: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

// Method to generate Barcode
ClientinvoiceSchema.methods.generateBarcode = async function() {
  try {
    // Just use MongoDB's _id for the barcode
    const barcodeText = this._id.toString();

    // Generate barcode using bwip-js
    const barcodeBuffer = await new Promise((resolve, reject) => {
      bwipjs.toBuffer({
        bcid: 'code128',
        text: barcodeText,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: 'center',
      }, (err, png) => {
        if (err) reject(err);
        else resolve(png);
      });
    });

    this.barcode = `data:image/png;base64,${barcodeBuffer.toString('base64')}`;
    await this.save();
    return this.barcode;
  } catch (error) {
    console.error('Barcode generation error:', error);
    return null;
  }
};

module.exports = mongoose.model("client-invoice", ClientinvoiceSchema);
