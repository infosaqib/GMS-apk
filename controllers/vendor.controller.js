"use strict";

const vendorProfile = require('../models/vendor.model')

const getVendorProfiles = async (req, res) => {
    try {
        const vendorProfileData = await vendorProfile.find();
        res.status(200).json(vendorProfileData);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getVendorProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const vendorProfileData = await vendorProfile.findById(id)

        if (!vendorProfileData) {
            return res.status(404).json({ message: "Vendor Profile not found" })
        }

        res.status(200).json(vendorProfileData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createVendorProfile = async (req, res) => {
    try {

        const { name, fatherName, contact, cnic } = req.body
        const vendorProfileData = new vendorProfile({ name, fatherName, contact, cnic })


        await vendorProfileData.save();
        // res.status(201);
        res.redirect('/vendors')
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Vendor Profile with this name already exists" })
            return;
        } else {
            res.status(500).json({ message: error.message })
        }
    }
}

const updateVendorProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { up_name, up_fatherName, up_contact, up_cnic } = req.body;

        // Input validation
        // if (!up_name || !up_fatherName || [up_contact || up_cnic].some(isNaN)) {
        //     return res.status(400).json({ message: 'Invalid input data' });
        // }

        const vendorProfileData = await vendorProfile.findByIdAndUpdate(id, {
            name: up_name,
            fatherName: up_fatherName,
            contact: up_contact,
            cnic: up_cnic
        }, { new: true })

        if (!vendorProfileData) {
            return res.status(404).json('Vendor Profile not found')
        }
        res.status(201).json(vendorProfileData)
        // res.redirect('/vendorprofile')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteVendorProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const vendorProfileData = await vendorProfile.findByIdAndDelete(id)

        if (!vendorProfileData) {
            return res.status(404).json({ message: "vendorProfile not found" })
        }

        res.status(200).json({ message: "Vendor Profile deleted successfully" })
    }
    catch (error) {
        // console.error("Server error:", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getVendorProfiles, getVendorProfileById, createVendorProfile, updateVendorProfile, deleteVendorProfile }