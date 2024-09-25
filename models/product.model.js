const mongoose = require('mongoose');

//* Database Connection
const connectDB = require('../db');
connectDB();

//? Schema
const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    unique: true
  },
  cleaning_price: {
    type: Number,
  },
  granding_price: {
    type: Number,
    required: true,
  },
  chrai_price: {
    type: Number,
  },
  pinjai_price: {
    type: Number,
  },
  filling_price: {
    type: Number,
  },
  stiching_price: {
    type: Number,
  },
  total_price: {
    type: Number,
    required: true
  },
})

module.exports = mongoose.model('product', productSchema);