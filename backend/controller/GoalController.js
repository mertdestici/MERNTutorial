const asyncHandler = require('express-async-handler');

const Goal = require('../models/GoalModel');
const User = require('../models/UserModel');
const Log = require('../models/LogModel');

const updateLog = asyncHandler(async (logid, body, statusCode) => {
    const updatedGoal = await Log.findByIdAndUpdate(logid, {
        responseBody: body,
        responseStatusCode: statusCode
    }, {
        new: false
    });
});

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id});
    updateLog(req.app.locals.logid, JSON.stringify(`{message: ${goals}}`), "200");
    res.status(200).json({message: goals});
});

// @desc    Set goal
// @route   Post /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (req.body === {} || !req.body.text) {
        res.status(400);
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    });
    updateLog(req.app.locals.logid, JSON.stringify(`{message: ${goal}}`), "200");
    res.status(200).json({message: goal});
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    updateLog(req.app.locals.logid, JSON.stringify(`{message: ${updatedGoal}}`), "200");
    res.status(200).json({message: `Update goal ${updatedGoal}`});
});

// @desc    Get goals
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove();

    updateLog(req.app.locals.logid, JSON.stringify(`{message: ${req.params.id}}`), "200");
    res.status(200).json({id: req.params.id})
});

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal, updateLog
}