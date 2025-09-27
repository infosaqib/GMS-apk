require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected successfully to MongoDB (^_^) ');
    } catch (error) {
        throw new Error(`Internal server Error, please try again::: ${error.message}`);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        throw new Error(`disconnect DB is failed -_- ::: ${error.message}`);
    }
};

process.on('SIGINT', async () => {
    await disconnectDB();
    process.exit(0);
});

module.exports = connectDB;