const mongoose = require('mongoose');

const weightRecordSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('WeightRecord', weightRecordSchema);

