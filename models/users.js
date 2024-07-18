const mongoose = require('mongoose');
const { format } = require('morgan');

mongoose.connect('mongodb://127.0.0.1:27017/gms-db');

const id = `#${String(Math.floor(Math.random() * 1000000)).padStart(6, 0)}`

const userSchema = new mongoose.Schema({
  id:{
    type: String,
    required: true,
    unique: true, 
    default: id
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    format: 'yyyy-mm-dd',
    default: Date.now
  },
  item_name: {
    type: String,
    required: true
  },
  item_weight: {
    type: Number,
    required: true
  },
  total_price:  {
    type: Number,
    required: true
  },
})

module.exports = mongoose.model('user', userSchema);