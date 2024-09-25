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

        const { name, fatherName, contact, cnic, items, remaining, total } = req.body
        const userData = new User({
            name: name,
            father_name: fatherName,
            contact: contact,
            cnic: cnic,
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

// const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findByIdAndUpdate(id, {
//             name: req.body.name,
//             item_name: req.body.items,
//             item_weight: req.body.remaining,
//             total_price: req.body.total
//         }, { new: true })

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }

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

module.exports = { getUsers, getUserById, createUser, deleteUser }