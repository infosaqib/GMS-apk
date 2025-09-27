const errorHandler = require( './globalErrorHandler.middleware.js');

 function setupErrorHandlers(app) {
    app.use(errorHandler);

    process.on('uncaughtException', (err) => {
        console.error('UNCAUGHT EXCEPTION! Shutting down...');
        console.error(err.name, err.message);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
        console.error('UNHANDLED REJECTION! Shutting down...');
        console.error(reason);
        process.exit(1);
    });
}

module.exports = {setupErrorHandlers}