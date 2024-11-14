"use strict";

const Profile = require('../models/profile.model')

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findById(id)

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" })
        }

        res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createProfile = async (req, res) => {
    try {

        const { name, fatherName, contact, cnic } = req.body
        const profileData = new Profile({ name, fatherName, contact, cnic })


        await profileData.save();
        // res.status(201);
        res.redirect('/profiles')
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Profile with this name already exists" })
            return;
        } else {
            res.status(500).json({ message: error.message })
        }
    }
}

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { up_name, up_fatherName, up_contact, up_cnic } = req.body;

        // Input validation
        // if (!up_name || !up_fatherName || [up_contact || up_cnic].some(isNaN)) {
        //     return res.status(400).json({ message: 'Invalid input data' });
        // }

        const profile = await Profile.findByIdAndUpdate(id, {
            name: up_name,
            fatherName: up_fatherName,
            contact: up_contact,
            cnic: up_cnic
        }, { new: true })

        if (!profile) {
            return res.status(404).json('Profile not found')
        }
        res.status(201).json(profile)
        // res.redirect('/profile')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findByIdAndDelete(id)

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" })
        }

        res.status(200).json({ message: "Profile deleted successfully" })
    }
    catch (error) {
        // console.error("Server error:", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getProfiles, getProfileById, createProfile, updateProfile, deleteProfile }