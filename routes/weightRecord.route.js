const express = require('express')
const router = express.Router();

const { storeWeight, getAllWeight, updateWeight } = require("../controllers/weightRecord.controller.js")


router.post('/', storeWeight);
router.get('/', getAllWeight);
router.put('/:id', updateWeight);

module.exports = router;