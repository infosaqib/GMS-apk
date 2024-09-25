"use strict";

const express = require('express');
const router = express.Router();

const { getUsers, getUserById, createUser, deleteUser } = require('../controllers/user.controller');


//READ ALL
router.get('/', getUsers)

//READ BY ID
router.get('/:id', getUserById)

//CREATE API
router.post('/', createUser)



//DELETE API
router.delete('/:id', deleteUser);

module.exports = router;