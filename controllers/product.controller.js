"use strict";

const Product = require('../models/product.model');
const ApiError = require('../services/ApiError.service');

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            data: products
        });
    } catch (error) {
        next(new ApiError(500, 'Failed to retrieve products', [], error.stack));
    }
}

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(400, 'Product ID is required');
        }

        const product = await Product.findById(id);

        if (!product) {
            throw new ApiError(404, 'Product not found');
        }

        res.status(200).json({
            success: true,
            message: 'Product retrieved successfully',
            data: product
        });
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, 'Failed to retrieve product', [], error.stack));
        }
    }
}

const createProduct = async (req, res, next) => {
    try {
        const {
            product_name,
            cleaning_price,
            granding_price,
            chrai_price,
            pinjai_price,
            filling_price,
            stiching_price,
            stocked_qty,
            product_price,
            total_price
        } = req.body;

        // Input validation
        if (!product_name) {
            throw new ApiError(400, 'Product name is required');
        }

        const productData = new Product({
            product_name,
            cleaning_price,
            granding_price,
            chrai_price,
            pinjai_price,
            filling_price,
            stiching_price,
            stocked_qty,
            product_price,
            total_price
        });

        await productData.save();

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: productData
        });
    } catch (error) {
        if (error.code === 11000) {
            next(new ApiError(400, 'Product with this name already exists'));
        } else if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, 'Failed to create product', [], error.stack));
        }
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            up_product_name,
            up_cleaning_price,
            up_granding_price,
            up_chrai_price,
            up_pinjai_price,
            up_filling_price,
            up_stiching_price,
            up_stocked_qty,
            up_product_price,
            up_total_price
        } = req.body;

        if (!id) {
            throw new ApiError(400, 'Product ID is required');
        }

        // Input validation
        if (!up_product_name) {
            throw new ApiError(400, 'Product name is required');
        }

        const product = await Product.findByIdAndUpdate(id, {
            product_name: up_product_name,
            cleaning_price: up_cleaning_price,
            granding_price: up_granding_price,
            chrai_price: up_chrai_price,
            filling_price: up_filling_price,
            stiching_price: up_stiching_price,
            pinjai_price: up_pinjai_price,
            stocked_qty: up_stocked_qty,
            product_price: up_product_price,
            total_price: up_total_price,
        }, { new: true, runValidators: true });

        if (!product) {
            throw new ApiError(404, 'Product not found');
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, 'Failed to update product', [], error.stack));
        }
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(400, 'Product ID is required');
        }

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            throw new ApiError(404, 'Product not found');
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, 'Failed to delete product', [], error.stack));
        }
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}