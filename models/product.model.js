const mongoose = require('mongoose');

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
  stocked_qty: {
    type: Number,
  },
  product_price: {
    type: Number,
  },
  total_price: {
    type: Number,
    default: 0
  },
})

module.exports = mongoose.model('product', productSchema);