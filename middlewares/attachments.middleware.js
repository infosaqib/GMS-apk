// src/middlewares/multer.middleware.js
const multer = require('multer');

// Store files in memory (RAM) to push directly to S3
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = { upload };
