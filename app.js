let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
require('dotenv').config();

let indexRouter = require('./routes/index.route');
let weightRecordRouter = require('./routes/weightRecord.route');
let caloriesRecordRouter = require('./routes/caloriesRecord.route');
let mealRecordRouter = require('./routes/mealRecord.route');

let app = express();

// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/api/calories',caloriesRecordRouter)
app.use('/api/weight', weightRecordRouter)
app.use('/api/meal', mealRecordRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send('Route not found');
  next(createError(404));
});


module.exports = app;
