let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
require('dotenv').config();

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
let invoicesRouter = require('./routes/invoice.route');
let profileRouter = require('./routes/profile.route');

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
app.use('/api/invoices', invoicesRouter);
app.use('/api/products', productRouter)
app.use('/api/profiles', profileRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send('Route not found');
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
