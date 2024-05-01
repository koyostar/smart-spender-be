const Expense = require('../../models/expense');
const SharedExpense = require('../../models/sharedExpense');
const User = require('../../models/user');

module.exports = {
    create,
    findAll,
    findByCreatedUser,
    findByCreatedUserCategory,
    findByCategory,
    remove,
};

async function create(req, res) {
    try {
        const expenseDetails = req.body;
        const expense = await Expense.create(expenseDetails);

        /* if (sharedExpenseField) {
            sharedExpenseField.forEach(sharedExpense => {
                const sharedExpenseDetails = req.body.sharedExpense;
                await sharedExpense.create({
                    expenseId: expense.expenseId,
                    user: sharedExpense.user,
                    amountOwed: sharedExpense.amount,
                });
            });
        } */

        return res.status(201).json(expense);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function findAll(req, res) {
    try {
        const expense = await Expense.find({}); 

        return res.status(201).json(expense);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function findByCreatedUser(req, res) {
    try {
        const { userid } = req.params;
        const user = await User.findById(userid);
        const expenses = await Expense.find({ createdBy: user._id });
        
        return res.status(201).json({ expenses });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function findByCreatedUserCategory(req, res) {
    try {
        const { userid, category } = req.params;
        const user = await User.findById(userid);
        const expenses = await Expense.find({ createdBy: user._id, category: category });
        
        return res.status(201).json({ expenses });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function findByCategory(req, res) {
    try {
        const { category } = req.params;
        const expenses = await Expense.find({ category: category });
        
        return res.status(201).json({ expenses });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function remove(req, res) {
    try {
        const { expenseid } = req.params;
        const expense = await Expense.deleteOne({ expenseId: expenseid })
        const sharedExpenses = await SharedExpense.deleteMany({ expenseId: expenseid });
        
        return res.status(201).json({ expense, sharedExpenses });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}