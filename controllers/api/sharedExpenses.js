const SharedExpense = require('../../models/sharedExpense');
const User = require('../../models/user');

module.exports = {
    find,
    findByUser,
    update,
};

async function find(req, res) {
    try {
        const sharedExpense = await sharedExpense.find({}); 

        return res.status(201).json(sharedExpense);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function findByUser(req, res) {
    try {
        const { userid } = req.params;
        const expense = await sharedExpense.find({ user: userid }); 

        return res.status(201).json(expense);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function update(req, res) {
    try {
        const { expenseid, userid } = req.params;
        // delete record, then create new one to avoid duplicates
        const sharedExpense = await sharedExpense.deleteOne({ expenseId: expenseid, user: userid })

        const sharedExpenseDetails = req.body;

        if (sharedExpenseDetails) {
            const newSharedExpense = await SharedExpense.create(sharedExpenseDetails); 
            return res.status(201).json(newSharedExpense);
        } else {
            return res.status(201).json(sharedExpense);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}