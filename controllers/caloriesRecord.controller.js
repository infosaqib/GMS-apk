const CaloriesRecord = require('../models/caloriesRecord.model.js')

const storeCalories = async (req, res, next) => {
    try {
        const { calories } = req.body;

        if (calories === undefined || calories === null) {
            return res.status(400).json({ error: 'Calories are required' });
        }
        if (typeof calories !== 'number' || calories <= 0) {
            return res.status(400).json({ error: 'Calories must be a positive number' });
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
            return res.status(404).json({ error: 'No calories are found' });
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
            return res.status(400).json({ error: 'Invalid calories record ID' });
        }

        if (calories === undefined || calories === null) {
            return res.status(400).json({ error: 'calories is required' });
        }
        if (typeof calories !== 'number' || calories <= 0) {
            return res.status(400).json({ error: 'Calories must be a positive number' });
        }

        const updatedRecord = await CaloriesRecord.findByIdAndUpdate(
            id,
            { calories },
            { new: true, runValidators: true }
        );

        if (!updatedRecord) {
            return res.status(404).json({ error: 'Calories are not found' });
        }

        return res.status(200).json({
            message: 'Calories stored successfully',
            data: updatedRecord
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {storeCalories, getAllCalories, updateCalories}