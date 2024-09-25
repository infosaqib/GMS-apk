"use strict";

const Product = require('../models/product.model')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createProduct = async (req, res) => {
    try {

        const { productName, cleaningPrice, grandingPrice, chraiPrice, pinjaiPrice, fillingPrice, stichingPrice, totalPrice } = req.body
        const productData = new Product({
            product_name: productName,
            cleaning_price: cleaningPrice,
            granding_price: grandingPrice,
            chrai_price: chraiPrice,
            filling_price: fillingPrice,
            stiching_price: stichingPrice,
            pinjai_price: pinjaiPrice,
            total_price: totalPrice,
        })
        await productData.save();
        // res.status(201);
        res.redirect('http://localhost:3000/product')
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Product with this name already exists" })
            return;
        } else {
            res.status(500).json({ message: error.message })
        }
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { up_product_name, up_cleaning_price, up_granding_price, up_chrai_price, up_pinjai_price, up_filling_price, up_stiching_price, up_total_price } = req.body;

        // Input validation
        if (!up_product_name || [up_cleaning_price || up_granding_price || up_chrai_price || up_pinjai_price || up_filling_price || up_stiching_price || up_total_price].some(isNaN)) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const product = await Product.findByIdAndUpdate(id, {
            product_name: up_product_name,
            cleaning_price: up_cleaning_price,
            granding_price: up_granding_price,
            chrai_price: up_chrai_price,
            filling_price: up_filling_price,
            stiching_price: up_stiching_price,
            pinjai_price: up_pinjai_price,
            total_price: up_total_price,
        }, { new: true })

        if (!product) {
            return res.status(404).json('Product not found')
        }
        res.status(201).json(product)
        // res.redirect('/product')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.status(200).json({ message: "Product deleted successfully" })
    }
    catch (error) {
        // console.error("Server error:", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }