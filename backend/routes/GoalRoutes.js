const express = require('express');
const router = express.Router();
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controller/GoalController');
const {protect} = require('../middleware/AuthMiddleware');
const {logMiddleware} = require("../middleware/LogMiddleware");

router.route('/').get(protect, logMiddleware, getGoals).post(protect, logMiddleware, setGoal);
router.route('/:id').put(protect, logMiddleware, updateGoal).delete(protect, logMiddleware, deleteGoal);

// router.get('/', getGoals);
//
// router.post('/', setGoal);
//
// router.put('/:id', updateGoal);
//
// router.delete('/:id', deleteGoal);

module.exports = router;