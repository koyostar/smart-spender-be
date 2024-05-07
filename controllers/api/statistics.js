const Expense = require("../../models/expense");
const SharedExpense = require("../../models/sharedExpense");
const User = require("../../models/user");

async function calculateStats(req, res) {
  try {
    console.log("Calculating statistics...");

    const { userid } = req.query;
    console.log("UserID:", userid);

    const user = await User.findById(userid);

    const amountSpent = await Expense.aggregate([
      { $match: { createdBy: user._id } },
      {
        $group: {
          _id: null,
          amountSpent: { $sum: "$amount" },
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

    const paidSharedExpenses = await SharedExpense.aggregate([
      { $match: { user: user._id, isPaid: true } },
      {
        $group: {
          _id: null,
          totalPaid: { $sum: "$amountOwed" },
        },
      },
    ]);

    const userExpenses = await Expense.find({ createdBy: user._id });
    const expenseIds = userExpenses.map((expense) => expense.expenseId);
    const sharedExpenseOwed = await SharedExpense.aggregate([
      {
        $match: { expenseId: { $in: expenseIds }, isPaid: false },
      },
      {
        $group: {
          _id: null,
          totalAmountIsOwed: { $sum: "$amountOwed" },
          usersThatOwes: {
            $addToSet: {
              user: "$user",
              amountOwed: "$amountOwed",
            },
          },
        },
      },
    ]);

    const sharedExpensePaid = await SharedExpense.aggregate([
      {
        $match: { expenseId: { $in: expenseIds }, isPaid: true },
      },
      {
        $group: {
          _id: null,
          totalAmountIsPaid: { $sum: "$amountOwed" },
          usersThatPaid: {
            $addToSet: {
              user: "$user",
              amountPaid: "$amountOwed",
            },
          },
        },
      },
    ]);

    const totalExpenses =
      (amountSpent[0]?.amountSpent || 0) +
      (paidSharedExpenses[0]?.totalPaid || 0) -
      (sharedExpensePaid[0]?.totalAmountIsPaid || 0);

    return res.status(200).json({
      amountSpent: amountSpent[0] || {
        amountSpent: 0,
        numofExpenses: 0,
      },
      totalSharedExpenses: totalSharedExpenses[0] || { totalOwed: 0 },
      unpaidSharedExpenses: unpaidSharedExpenses[0] || { totalUnpaid: 0 },
      paidSharedExpenses: paidSharedExpenses[0] || { totalPaid: 0 },
      sharedExpenseOwed: sharedExpenseOwed[0] || {
        totalAmountIsOwed: 0,
        usersThatOwes: [],
      },
      sharedExpensePaid: sharedExpensePaid[0] || {
        totalAmountIsPaid: 0,
        usersThatPaid: [],
      },
      totalExpenses: totalExpenses,

      message: "Statistics calculated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { calculateStats };
