const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/gms-db');

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    unique: true
  },
  cleaning_price: {
    type: Number,
    required: true
  },
  granding_price: {
    type: Number,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
})

module.exports = mongoose.model('product', productSchema);