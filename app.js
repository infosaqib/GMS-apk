require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');
const routes = require('./routes/index.route');
const ApiError = require('./services/ApiError.service');
const globalErrorHandler = require('./middlewares/globalErrorHandler.middleware');

const app = express();

app.use(express.json());

connectDB();

app.use('/api', routes);

// 404 handler
app.use((req, res, next) => {
    next(new ApiError(404, 'Resource not found'));
});

// Global error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
