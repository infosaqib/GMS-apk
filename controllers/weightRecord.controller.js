const WeightRecord = require('../models/weightRecord.model.js');
const ApiError = require('../services/ApiError.service');

const storeWeight = async (req, res, next) => {
    try {
        const { weight } = req.body;

        if (weight === undefined || weight === null) {
            throw new ApiError(400, 'Weight is required');
        }
        if (typeof weight !== 'number' || weight <= 0) {
            throw new ApiError(400, 'Weight must be a positive number');
        }

        const newWeightRecord = new WeightRecord({ weight });
        await newWeightRecord.save();

        return res.status(201).json({
            message: 'Weight stored successfully'
        });
    } catch (error) {
        next(error);
    }
};

const getAllWeight = async (req, res, next) => {
    try {
        const weights = await WeightRecord.find().sort({ createdAt: -1 });

        if (!weights || weights.length === 0) {
            throw new ApiError(404, 'No weight is found');
        }

        res.status(200).json({
            message: 'Weights retrieved successfully',
            data: weights
        });
    } catch (error) {
        next(error);
    }
};

const updateWeight = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { weight } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, 'Invalid weight record ID');
        }

        if (weight === undefined || weight === null) {
            throw new ApiError(400, 'Weight is required');
        }
        if (typeof weight !== 'number' || weight <= 0) {
            throw new ApiError(400, 'Weight must be a positive number');
        }

        const updatedRecord = await WeightRecord.findByIdAndUpdate(
            id,
            { weight },
            { new: true, runValidators: true }
        );

        if (!updatedRecord) {
            throw new ApiError(404, 'Weight is not found');
        }

        return res.status(200).json({
            message: 'Weight updated successfully',
            data: updatedRecord
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { storeWeight, getAllWeight, updateWeight }