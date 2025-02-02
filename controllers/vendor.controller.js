"use strict";

const vendorModel = require('../models/vendor.model')

const getVendors = async (req, res) => {
    try {
        const vendor = await vendorModel.find();
        res.status(200).json(vendor);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getVendorById = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await vendorModel.findById(id)

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" })
        }

        res.status(200).json(vendor);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createVendor = async (req, res) => {
    try {

        const { name, fatherName, contact, cnic } = req.body
        const vendor = new vendorModel({ name, fatherName, contact, cnic })


        await vendor.save();
        // res.status(201);
        res.redirect('/vendors')
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Vendor with this name already exists" })
            return;
        } else {
            res.status(500).json({ message: error.message })
        }
    }
}

const updateVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const { up_name, up_fatherName, up_contact, up_cnic } = req.body;

        // Input validation
        // if (!up_name || !up_fatherName || [up_contact || up_cnic].some(isNaN)) {
        //     return res.status(400).json({ message: 'Invalid input data' });
        // }

        const vendor = await vendorModel.findByIdAndUpdate(id, {
            name: up_name,
            fatherName: up_fatherName,
            contact: up_contact,
            cnic: up_cnic
        }, { new: true })

        if (!vendor) {
            return res.status(404).json('Vendor not found')
        }
        res.status(201).json(vendor)
        // res.redirect('/vendors')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await vendorModel.findByIdAndDelete(id)

        if (!vendor) {
            return res.status(404).json({ message: "vendor not found" })
        }

        res.status(200).json({ message: "Vendor deleted successfully" })
    }
    catch (error) {
        // console.error("Server error:", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getVendors, getVendorById, createVendor, updateVendor, deleteVendor }