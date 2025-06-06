const mongoose = require('mongoose');

const caloriesRecordSchema = new mongoose.Schema({
    calories: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('CaloriesRecord', caloriesRecordSchema);
