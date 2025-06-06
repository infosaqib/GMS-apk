const express = require('express')
const router = express.Router();

const { getMealRecords, storeMealRecords } = require("../controllers/mealRecord.controller.js")


router.post('/', storeMealRecords);
router.get('/', getMealRecords);

module.exports = router;