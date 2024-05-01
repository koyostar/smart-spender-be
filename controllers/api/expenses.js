const Expense = require('../../models/expense');
const User = require('../../models/user');

module.exports = {
    create,
    findAll,
    findByCreatedUser,
};

// A cart is the unpaid order for a user
async function create(req, res) {
    try {
        const expenseDetails = req.body;
        const expense = await Expense.create(expenseDetails); 

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
        
        return res.status(201).json({ user, expenses });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


