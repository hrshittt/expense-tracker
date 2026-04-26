const express = require('express');
const router = express.Router();
const {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getSummary
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getExpenses)
    .post(protect, addExpense);

router.route('/summary').get(protect, getSummary);

router.route('/:id')
    .put(protect, updateExpense)
    .delete(protect, deleteExpense);

module.exports = router;
