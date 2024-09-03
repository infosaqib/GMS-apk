var express = require('express');
var router = express.Router();
const userModel = require('../models/users');

router.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;