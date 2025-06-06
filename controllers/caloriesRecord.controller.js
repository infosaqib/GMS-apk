const CaloriesRecord = require('../models/caloriesRecord.model.js')
const ApiError = require('../services/ApiError.service');

const storeCalories = async (req, res, next) => {
    try {
        const { calories } = req.body;

        if (calories === undefined || calories === null) {
            throw new ApiError(400, 'Calories are required');
        }
        if (typeof calories !== 'number' || calories <= 0) {
            throw new ApiError(400, 'Calories must be a positive number');
        }

        const newCaloriesRecord = new CaloriesRecord({ calories });
        await newCaloriesRecord.save();

        return res.status(201).json({
            message: 'Calories stored successfully'
        });
    } catch (error) {
        next(error);
    }
};

const getAllCalories = async (req, res, next) => {
    try {
        const calories = await CaloriesRecord.find().sort({ createdAt: -1 });

        if (!calories || calories.length === 0) {
            throw new ApiError(404, 'No calories are found');
        }

        res.status(200).json({
            message: 'Calories retrieved successfully',
            data: calories
        });
    } catch (error) {
        next(error);
    }
};

const updateCalories = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { calories } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, 'Invalid calories record ID');
        }

        if (calories === undefined || calories === null) {
            throw new ApiError(400, 'calories is required');
        }
        if (typeof calories !== 'number' || calories <= 0) {
            throw new ApiError(400, 'Calories must be a positive number');
        }

        const updatedRecord = await CaloriesRecord.findByIdAndUpdate(
            id,
            { calories },
            { new: true, runValidators: true }
        );

        if (!updatedRecord) {
            throw new ApiError(404, 'Calories are not found');
        }

        return res.status(200).json({
            message: 'Calories stored successfully',
            data: updatedRecord
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { storeCalories, getAllCalories, updateCalories }