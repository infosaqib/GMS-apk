"use strict";

const express = require('express');
const router = express.Router();

const { getClients, getClientById, createClient, updateClient, deleteClient } = require('../controllers/client.controller');


//READ ALL
router.get('/', getClients)

//READ BY ID
router.get('/:id', getClientById)


//CREATE API
router.post('/', createClient)

//UPDATE API
router.put('/:id', updateClient)


//DELETE API
router.delete('/:id', deleteClient);

module.exports = router;