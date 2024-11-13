"use strict";

const express = require('express');
const router = express.Router();

const { getProfiles, getProfileById, createProfile, updateProfile, deleteProfile } = require('../controllers/profile.controller');


//READ ALL
router.get('/', getProfiles)

//READ BY ID
router.get('/:id', getProfileById)


//CREATE API
router.post('/', createProfile)

//UPDATE API
router.put('/:id', updateProfile)


//DELETE API
router.delete('/:id', deleteProfile);

module.exports = router;