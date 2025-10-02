require('dotenv').config();
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const { setupMiddlewares } = require('./middlewares/index.middleware');
const { setupErrorHandlers } = require('./middlewares/errorHandler.middleware');
const { connectDB, disconnectDB } = require('./config/db.config');
const PORT = process.env.PORT;

// In app.js, before mounting routes
// app.use((req, res, next) => {
//   console.log('Incoming request:', {
//       method: req.method,
//       url: req.originalUrl,
//       body: req.body
//   });
//   next();
// });

let indexRouter = require('./routes/index.route');
const productRouter = require('./routes/product.route')
let clientInvoicesRouter = require('./routes/client-invoice.route');
let vendorInvoicesRouter = require('./routes/vendor-invoice.route');
let clientRouter = require('./routes/client.route');
let vendorRouter = require('./routes/vendor.route');
let weightRecordRouter = require('./routes/weightRecord.route');
let caloriesRecordRouter = require('./routes/caloriesRecord.route');
let mealRecordRouter = require('./routes/mealRecord.route');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

app.use('/', indexRouter);
app.use('/api/client-invoices', clientInvoicesRouter);
app.use('/api/vendor-invoices', vendorInvoicesRouter);
app.use('/api/products', productRouter)
app.use('/api/clients', clientRouter)
app.use('/api/vendors', vendorRouter)
app.use('/api/calories', caloriesRecordRouter)
app.use('/api/weight', weightRecordRouter)
app.use('/api/meal', mealRecordRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// Error handling middleware should be after all routes
setupMiddlewares(app)
setupErrorHandlers(app);

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();

process.on('SIGINT', async () => {
  console.log("\nShutting down gracefully...");
  await disconnectDB();
  process.exit(0);
});

