const asyncHandler = require('express-async-handler');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get goals'});
});

// @desc    Set goal
// @route   Post /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    const goal = req.body;
    if (goal === {} || !goal.id || !goal.text) {
        res.status(400)
        throw new Error('Please add a text field')
    } else {
        console.log(req.body);
        res.status(200).json({message: 'Set goals'});
    }
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`});
});

// @desc    Get goals
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete goals ${req.params.id}`});
});

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}