// db.js
const mongoose = require('mongoose');
const ApiError = require('../services/ApiError.service');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new ApiError(500, 'MongoDB URI is not defined in environment variables');
        }
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connect successfully to MongoDB (^_^) ');
    } catch (error) {
        console.error('-_- Database connection failed:', error.message);
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Database connection failed', [], error.stack);
    }
};

// Graceful disconnect function
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('Database disconnected successfully');
    } catch (error) {
        console.error('Error disconnecting from database:', error.message);
    }
};

module.exports = { connectDB, disconnectDB };