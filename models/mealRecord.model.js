const mongoose = require('mongoose');

const mealRecordSchema = new mongoose.Schema({
  foodId: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  amount: {
    type: String, 
    required: true
  },
  unit: {
    type: String,
  },
  calories: {
    type: String,
    required: true
  },
  totalFat: {
    type: String,
    required: true
  },
  satFat: {
    type: String,
    required: true
  },
  cholesterol: {
    type: String,
    required: true
  },
  sodium: {
    type: String,
    required: true
  },
  carbs: {
    type: String,
    required: true
  },
  fiber: {
    type: String,
    required: true
  },
  sugars: {
    type: String,
    required: true
  },
  protein: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MealRecord', mealRecordSchema);
