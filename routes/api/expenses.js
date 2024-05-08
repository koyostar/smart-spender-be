const express = require('express');
const router = express.Router();

const expensesCtrl = require('../../controllers/api/expenses');

router.post('/create', expensesCtrl.create);

// Find by expenseId
router.get('/find/expenseid/:expenseid', expensesCtrl.findByExpenseId)

// Find by created user
router.get('/find/user/:userid', expensesCtrl.findByCreatedUser)
router.get('/find/user/:userid/:category', expensesCtrl.findByCreatedUserCategory)

// Find by category
router.get('/find/category/:category', expensesCtrl.findByCategory)
router.get('/find', expensesCtrl.findAll);

router.delete('/delete/:expenseid', expensesCtrl.remove)

module.exports = router;