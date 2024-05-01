const express = require('express');
const router = express.Router();

const expensesCtrl = require('../../controllers/api/expenses');

router.post('/create', expensesCtrl.create);

router.get('/find', expensesCtrl.findAll);
router.get('/find/user/:userid', expensesCtrl.findByCreatedUser)

module.exports = router;