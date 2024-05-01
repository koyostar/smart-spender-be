const express = require('express');
const router = express.Router();

const sharedExpensesCtrl = require('../../controllers/api/sharedExpenses');

router.get('/find', sharedExpensesCtrl.find);
router.get('/find/user/:userid', sharedExpensesCtrl.findByUser);
router.get('/find/expenseid/:expenseid', sharedExpensesCtrl.findByExpenseId);

router.post('/update/:expenseid/:userid', sharedExpensesCtrl.update);

module.exports = router;