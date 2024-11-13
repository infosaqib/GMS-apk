const { format } = require("morgan");
const mongoose = require('mongoose');

//* Database Connection
const connectDB = require('../db');
connectDB();



const profileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        fatherName: {
            type: String,
            required: true,
        },
        contact: {
            type: Number,
            required: true,
        },
        cnic: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("profile", profileSchema);
