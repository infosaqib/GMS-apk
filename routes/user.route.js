"use strict";

const express = require('express');
const router = express.Router();

const { getUsers, getUserById, createUser, deleteUser, updateUser } = require('../controllers/user.controller');

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'User router is working' });
});

//READ ALL
router.get('/', getUsers)

//READ BY ID
router.get('/:id', getUserById)

//CREATE API
router.post('/', createUser)

//DELETE API
router.delete('/:id', deleteUser);

//UPDATE API
router.put('/:id', updateUser);

module.exports = router;