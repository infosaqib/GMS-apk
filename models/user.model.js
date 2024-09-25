const { format } = require("morgan");
const mongoose = require('mongoose');

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


const userSchema = new mongoose.Schema(
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
      type: Number,
      required: true,
    },
    cnic: {
      type: Number,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
