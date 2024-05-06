const Expense = require("../../models/expense");
const SharedExpense = require("../../models/sharedExpense");
const User = require("../../models/user");

async function calculateStats(req, res) {
  try {
    console.log("Calculating statistics...");

    const { userid } = req.query;
    console.log("UserID:", userid);

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
    const unpaidSharedExpenses = await SharedExpense.aggregate([
      { $match: { user: user._id, isPaid: false } },
      {
        $group: {
          _id: null,
          totalUnpaid: { $sum: "$amountOwed" },
        },
      },
    ]);

    const userExpenses = await Expense.find({ createdBy: user._id });
    const expenseIds = userExpenses.map((expense) => expense.expenseId);
    const sharedExpenseStats = await SharedExpense.aggregate([
      {
        $match: { expenseId: { $in: expenseIds }, isPaid: false },
      },
      {
        $group: {
          _id: null,
          totalAmountIsOwed: { $sum: "$amountOwed" },
        },
      },
    ]);

    return res.status(200).json({
      totalExpenses: totalExpenses[0] || {
        totalExpenses: 0,
        numofExpenses: 0,
      },
      totalSharedExpenses: totalSharedExpenses[0] || { totalOwed: 0 },
      unpaidSharedExpenses: unpaidSharedExpenses[0] || { totalUnpaid: 0 },
      sharedExpenseStats: sharedExpenseStats[0] || {
        totalAmountIsOwed: 0,
      },
      message: "Statistics calculated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { calculateStats };
