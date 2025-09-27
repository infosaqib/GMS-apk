"use strict";

const clientModel = require('../models/client.model');
const ApiError = require('../services/ApiError.service');

const getClients = async (req, res, next) => {
    try {
        const clients = await clientModel.find();
        res.status(200).json({
            success: true,
            message: 'Clients retrieved successfully',
            data: clients
        });
    } catch (error) {
        next(new ApiError(500, 'Failed to retrieve clients', [], error.stack));
    }
}

const getClientById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(400, 'Client ID is required');
        }

        const client = await clientModel.findById(id);

        if (!client) {
            throw new ApiError(404, 'Client not found');
        }

        res.status(200).json({
            success: true,
            message: 'Client retrieved successfully',
            data: client
        });
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, 'Failed to retrieve client', [], error.stack));
        }
    }
}

const createClient = async (req, res, next) => {
    try {
        const { name, fatherName, contact, cnic } = req.body;

        // Input validation
        if (!name || !fatherName || !contact || !cnic) {
            throw new ApiError(400, 'All fields (name, fatherName, contact, cnic) are required');
        }

        const client = new clientModel({ name, fatherName, contact, cnic });
        await client.save();

        res.status(201).json({
            success: true,
            message: 'Client created successfully',
            data: client
        });
    } catch (error) {
        if (error.code === 11000) {
            next(new ApiError(400, 'Client with this information already exists'));
        } else if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, 'Failed to create client', [], error.stack));
        }
    }
}

const updateClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { up_name, up_fatherName, up_contact, up_cnic } = req.body;

        if (!id) {
            throw new ApiError(400, 'Client ID is required');
        }

        // Input validation
        if (!up_name || !up_fatherName || !up_contact || !up_cnic) {
            throw new ApiError(400, 'All fields (name, fatherName, contact, cnic) are required');
        }

        const client = await clientModel.findByIdAndUpdate(id, {
            name: up_name,
            fatherName: up_fatherName,
            contact: up_contact,
            cnic: up_cnic
        }, { new: true, runValidators: true });

        if (!client) {
            throw new ApiError(404, 'Client not found');
        }

        res.status(200).json({
            success: true,
            message: 'Client updated successfully',
            data: client
        });
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, 'Failed to update client', [], error.stack));
        }
    }
}

const deleteClient = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(400, 'Client ID is required');
        }

        const client = await clientModel.findByIdAndDelete(id);

        if (!client) {
            throw new ApiError(404, 'Client not found');
        }

        res.status(200).json({
            success: true,
            message: 'Client deleted successfully'
        });
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, 'Failed to delete client', [], error.stack));
        }
    }
}

module.exports = { getClients, getClientById, createClient, updateClient, deleteClient }