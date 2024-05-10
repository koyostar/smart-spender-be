const Expense = require('../../models/expense');
const SharedExpense = require("../../models/sharedExpense");
const User = require("../../models/user");

module.exports = {
  find,
  findByUser,
  findByUserWithExpense,
  findByExpenseId,
  update,
  create,
};

async function find(req, res) {
  try {
    const sharedExpense = await SharedExpense.find({});

    return res.status(201).json(sharedExpense);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function findByUser(req, res) {
  try {
    const { userid } = req.params;
    const sharedExpenses = await SharedExpense.find({ user: userid });

    return res.status(201).json(sharedExpenses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function findByUserWithExpense(req, res) {
  try {
    const { userid } = req.params;
    const sharedExpenses = await SharedExpense.find({ user: userid, isPaid: false });

    const expenses = [];
    if (sharedExpenses) {
      for (const sharedExpense of sharedExpenses) {
          const getExpense = await Expense.find({
              expenseId: sharedExpense.expenseId,
          });

          if (getExpense.length > 0) {
            expenses.push(getExpense);
          }
      };
    }

    return res.status(201).json({ sharedExpenses, expenses });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function findByExpenseId(req, res) {
  try {
    const { expenseid } = req.params;
    const sharedExpenses = await SharedExpense.find({ expenseId: expenseid });

    return res.status(201).json(sharedExpenses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const { expenseid, userid } = req.params;
    // delete record, then create new one to avoid duplicates
    const sharedExpense = await SharedExpense.deleteOne({
      expenseId: expenseid,
      user: userid,
    });

    const sharedExpenseDetails = req.body;

    if (sharedExpenseDetails) {
      const newSharedExpense = await SharedExpense.create(sharedExpenseDetails);
      return res.status(201).json(newSharedExpense);
    } else {
      return res.status(201).json(sharedExpense);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const sharedExpenseDetails = req.body;
    const sharedExpense = await SharedExpense.create(sharedExpenseDetails);

    return res.status(201).json(sharedExpense);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
