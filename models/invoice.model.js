const mongoose = require('mongoose');
const QRCode = require('qrcode');

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


const invoiceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: generateUniqueId
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
      default: "Processing",
      enum: ["Processing", "Ordered", "Shipped", "Delivered", "Completed"]
    },
    qr_code: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
  }
);



// Method to generate QR code
invoiceSchema.methods.generateQRCode = async function() {
  const qrData = {
    invoice_id: this.id,
    customer_name: this.name,
    contact: this.contact,
    father_name: this.father_name,
    product_name: this.item_name,
    product_weight: this.item_weight,
    current_status: this.status,
    date: this.createdAt.toISOString(),
    total_amount: this.total_price
  };

  // Create formatted text for QR code
  const formattedText = `
Invoice Details
------------------------------
Invoice ID: #${qrData.invoice_id}
Date: ${new Date(qrData.date).toLocaleDateString()}
Customer Name: ${qrData.customer_name}
Father's Name: ${qrData.father_name}
Contact: ${qrData.contact}
Product: ${qrData.product_name}
Total Weight: ${qrData.product_weight} kg
Total Price: Rs: ${qrData.total_amount.toFixed(2)}
Current Status: ${qrData.current_status}
  `.trim();

  try {
    // Generate QR code from formatted text
    this.qr_code = await QRCode.toDataURL(formattedText);
    await this.save();
    return this.qr_code;
  } catch (error) {
    console.error('QR Code generation error:', error);
    return null;
  }
};

// Static method to update status by scanning QR code
invoiceSchema.statics.updateStatusByQRCode = async function(qrCodeData) {
  try {
    const invoiceData = JSON.parse(qrCodeData);
    const invoice = await this.findOne({ id: invoiceData.invoice_id });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    // Define status progression
    const statusProgression = [
      "Processing", 
      "Ordered", 
      "Shipped", 
      "Delivered", 
      "Completed"
    ];

    const currentIndex = statusProgression.indexOf(invoice.status);
    if (currentIndex < statusProgression.length - 1) {
      invoice.status = statusProgression[currentIndex + 1];
      await invoice.save();
    }

    return invoice;
  } catch (error) {
    console.error('QR Code status update error:', error);
    throw error;
  }
};

module.exports = mongoose.model("invoice", invoiceSchema);
