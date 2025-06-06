const express = require('express');
const router = express.Router();

const { storeCalories, getAllCalories, updateCalories } = require("../controllers/caloriesRecord.controller.js")


router.post('/', storeCalories);
router.get('/', getAllCalories);
router.put('/:id', updateCalories);

module.exports = router;