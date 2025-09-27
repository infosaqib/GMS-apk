const MealRecord = require('../models/mealRecord.model.js');
const ApiError = require('../services/ApiError.service');

const getMealRecords = async (req, res, next) => {
    try {
        const mealRecords = await MealRecord.find().sort({ createdAt: -1 });

        if (!mealRecords || mealRecords.length === 0) {
            throw new ApiError(404, 'No meal records found');
        }

        res.status(200).json({
            data: mealRecords
        });
    } catch (error) {
        next(error);
    }
}

const storeMealRecords = async (req, res, next) => {
    const {
        foodId,
        label,
        type,
        amount,
        calories,
        totalFat,
        satFat,
        cholesterol,
        sodium,
        carbs,
        fiber,
        sugars,
        protein
    } = req.body;

    // Check for all required fields
    if (
        !foodId || !label || !type || !amount ||
        !calories || !totalFat || !satFat || !cholesterol ||
        !sodium || !carbs || !fiber || !sugars || !protein
    ) {
        throw new ApiError(400, 'All fields are required');
    }

    try {
        const meal = new MealRecord({
            foodId,
            label,
            type,
            amount,
            unit: 'g',
            calories,
            totalFat,
            satFat,
            cholesterol,
            sodium,
            carbs,
            fiber,
            sugars,
            protein
        });

        await meal.save();

        res.status(201).json({
            message: 'Food data saved successfully',
            data: meal
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { getMealRecords, storeMealRecords }