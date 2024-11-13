"use strict";

const User = require('../models/user.model')

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createUser = async (req, res) => {
    try {

        const { name, father_name, contact, cnic, items, remaining, total } = req.body
        const userData = new User({
            name,
            father_name,
            contact,
            cnic,
            item_name: items,
            item_weight: remaining,
            total_price: total
        })
        await userData.save()
        res.redirect('http://localhost:3000/')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateUser = async (req, res) => {
    const {id} = req.params;
    const { status } = req.body;

    // Validate ObjectId format
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //     return res.status(400).json({
    //         message: 'Invalid user ID format',
    //         details: `ID ${userId} is not a valid MongoDB ObjectId`
    //     });
    // }

    try {
        const result = await User.findByIdAndUpdate(
            id, { status }, { new: true }
        );

        if (!result) {
            console.log(`User not found with ID: ${userId}`);
            return res.status(404).json({
                message: 'User not found',
                details: `No user exists with ID ${userId}`
            });
        }

        console.log('User updated successfully:', result);
        return res.status(200).json({
            message: 'Status updated successfully',
            user: result
        });
    } catch (error) {
        console.error("Error updating user status:", error);
        return res.status(500).json({
            message: 'Internal Server Error',
            details: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getUsers, getUserById, createUser, deleteUser, updateUser }