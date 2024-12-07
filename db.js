// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connect successfully to MongoDB (^_^) ');
    } catch (error) {
        console.error('-_- Internal server Error, please try again:::', error);
        process.exit(1);
    };
};

module.exports = connectDB