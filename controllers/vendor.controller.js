"use strict";

const vendorModel = require('../models/vendor.model');
const ApiError = require('../services/ApiError.service');

const getVendors = async (req, res, next) => {
    try {
        const vendors = await vendorModel.find();
        res.status(200).json({
            success: true,
            message: 'Vendors retrieved successfully',
            data: vendors
        });
    } catch (error) {
        next(new ApiError(500, 'Failed to retrieve vendors', [], error.stack));
    }
}

const getVendorById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(400, 'Vendor ID is required');
        }

        const vendor = await vendorModel.findById(id);

        if (!vendor) {
            throw new ApiError(404, 'Vendor not found');
        }

        res.status(200).json({
            success: true,
            message: 'Vendor retrieved successfully',
            data: vendor
        });
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, 'Failed to retrieve vendor', [], error.stack));
        }
    }
}

const createVendor = async (req, res, next) => {
    try {
        const { name, fatherName, contact, cnic } = req.body;

        // Input validation
        if (!name || !fatherName || !contact || !cnic) {
            throw new ApiError(400, 'All fields (name, fatherName, contact, cnic) are required');
        }

        const vendor = new vendorModel({ name, fatherName, contact, cnic });
        await vendor.save();

        res.status(201).json({
            success: true,
            message: 'Vendor created successfully',
            data: vendor
        });
    } catch (error) {
        if (error.code === 11000) {
            next(new ApiError(400, 'Vendor with this information already exists'));
        } else if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, 'Failed to create vendor', [], error.stack));
        }
    }
}

const updateVendor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { up_name, up_fatherName, up_contact, up_cnic } = req.body;

        if (!id) {
            throw new ApiError(400, 'Vendor ID is required');
        }

        // Input validation
        if (!up_name || !up_fatherName || !up_contact || !up_cnic) {
            throw new ApiError(400, 'All fields (name, fatherName, contact, cnic) are required');
        }

        const vendor = await vendorModel.findByIdAndUpdate(id, {
            name: up_name,
            fatherName: up_fatherName,
            contact: up_contact,
            cnic: up_cnic
        }, { new: true, runValidators: true });

        if (!vendor) {
            throw new ApiError(404, 'Vendor not found');
        }

        res.status(200).json({
            success: true,
            message: 'Vendor updated successfully',
            data: vendor
        });
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, 'Failed to update vendor', [], error.stack));
        }
    }
}

const deleteVendor = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(400, 'Vendor ID is required');
        }

        const vendor = await vendorModel.findByIdAndDelete(id);

        if (!vendor) {
            throw new ApiError(404, 'Vendor not found');
        }

        res.status(200).json({
            success: true,
            message: 'Vendor deleted successfully'
        });
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, 'Failed to delete vendor', [], error.stack));
        }
    }
}

module.exports = { getVendors, getVendorById, createVendor, updateVendor, deleteVendor }