const Expense = require("../../models/expense");
const SharedExpense = require("../../models/sharedExpense");
const User = require("../../models/user");

async function calculateStats(req, res) {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    const totalExpenses = await Expense.aggregate([
      { $match: { createdBy: user._id } },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: "$amount" },
          numofExpenses: { $sum: 1 },
        },
      },
    ]);
    const totalSharedExpenses = await SharedExpense.aggregate([
      { $match: { user: user._id } },
      {
        $group: {
          _id: null,
          totalOwed: { $sum: "$amountOwed" },
        },
      },
    ]);
    const unpaidSharedexpenses = await SharedExpense.aggregate([
      { $match: { user: user._id, isPaid: false } },
      {
        $group: {
          _id: null,
          totalUnpaid: { $sum: "$amountOwed" },
        },
      },
    ]);
    return res.status(200).json({ expensesStats });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
