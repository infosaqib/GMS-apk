"use strict";

const clientModel = require('../models/client.model')

const getClients = async (req, res) => {
    try {
        const clients = await clientModel.find();
        res.status(200).json(clients);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await clientModel.findById(id)

        if (!client) {
            return res.status(404).json({ message: "client not found" })
        }

        res.status(200).json(client);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createClient = async (req, res) => {
    try {

        const { name, fatherName, contact, cnic } = req.body
        const client = new clientModel({ name, fatherName, contact, cnic })

        //Data visualization
        

        await client.save();
        // res.status(201);
        res.redirect('/clients')
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "client with this name already exists" })
            return;
        } else {
            res.status(500).json({ message: error.message })
        }
    }
}

const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { up_name, up_fatherName, up_contact, up_cnic } = req.body;

        // Input validation
        // if (!up_name || !up_fatherName || [up_contact || up_cnic].some(isNaN)) {
        //     return res.status(400).json({ message: 'Invalid input data' });
        // }

        const client = await clientModel.findByIdAndUpdate(id, {
            name: up_name,
            fatherName: up_fatherName,
            contact: up_contact,
            cnic: up_cnic
        }, { new: true })

        if (!client) {
            return res.status(404).json('client not found')
        }
        res.status(201).json(client)
        // res.redirect('/clients')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await clientModel.findByIdAndDelete(id)

        if (!client) {
            return res.status(404).json({ message: "client not found" })
        }

        res.status(200).json({ message: "client deleted successfully" })
    }
    catch (error) {
        // console.error("Server error:", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getClients, getClientById, createClient, updateClient, deleteClient }