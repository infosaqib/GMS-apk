const { format } = require("morgan");
const mongoose = require('mongoose');

//* Database Connection
const connectDB = require('../db');
connectDB();



const vendorProfileSchema = new mongoose.Schema(
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
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("vendorProfile", vendorProfileSchema);
