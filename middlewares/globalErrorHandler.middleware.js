function errorHandler(err, req, res, next) {
    // Enhanced logging for token-related errors
    if (err.message && (err.message.includes('token') || err.message.includes('Token'))) {
        console.log('\n🚨 ===== TOKEN ERROR DETECTED =====');
        console.log('   Error Type:', err.name);
        console.log('   Error Message:', err.message);
        console.log('   Status Code:', err.statusCode);
        console.log('   Route:', req.method, req.originalUrl);
        console.log('   IP Address:', req.ip);
        console.log('   User Agent:', req.get('user-agent'));
        console.log('   Authorization Header:', req.get('authorization') ? 'Present' : 'Missing');
        console.log('   Cookies:', req.cookies ? Object.keys(req.cookies) : 'None');
        console.log('   Timestamp:', new Date().toISOString());
        console.log('   ======================================\n');
    } else {
        console.error('Global Error Handler:', err);
    }

    if (res.headersSent) {
        return next(err);
    }

    // Handle ApiError instances
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || [],
            data: err.data || null
        });
    }

    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        let message = 'Field already exists';

        // Map field names to user-friendly messages
        if (field.includes('email')) {
            message = 'Email already exists';
        } else if (field.includes('phoneNumber')) {
            message = 'Phone number already exists';
        } else if (field.includes('username')) {
            message = 'Username already exists';
        } else if (field.includes('jti')) {
            message = 'Token already exists';
        }

        return res.status(400).json({
            success: false,
            message: message,
            errors: [],
            data: null
        });
    }

    // Handle MongoDB validation errors
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: errors,
            data: null
        });
    }

    // Handle other errors
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        errors: [],
        data: null
    });
}

module.exports = errorHandler;