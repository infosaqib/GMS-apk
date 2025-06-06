require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const logger = require('./logger.middleware.js');
const limiter = require('../utils/rateLimiter.utils.js');

const allowedOrigins = [
    "http://localhost:3000",
    "http://getslimweblatest-alb-76389661.ap-south-1.elb.amazonaws.com",
];

const setupMiddlewares = (app) => {
    app.use(cookieParser());
    app.use(helmet());

    app.use(cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true
    }));

    app.use(logger);
    app.use(limiter);
};





module.exports = { setupMiddlewares };
