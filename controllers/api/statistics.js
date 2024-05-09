const Expense = require("../../models/expense");
const SharedExpense = require("../../models/sharedExpense");
const User = require("../../models/user");

async function calculateStats(req, res) {
  try {
    console.log("Calculating statistics...");

    const { userid } = req.query;
    console.log("UserID:", userid);

    const user = await User.findById(userid);

    const expensesCreated = await Expense.aggregate([
      { $match: { createdBy: user._id } },
      {
        $group: {
          _id: null,
          expensesCreated: { $sum: "$amount" },
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
          unpaidExpenses: {
            $addToSet: {
              expenseId: "$expenseId",
              amountOwed: "$amountOwed",
            },
          },
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
    const userExpensesOwed = await SharedExpense.aggregate([
      {
        $match: { expenseId: { $in: expenseIds }, isPaid: false },
      },
      {
        $group: {
          _id: null,
          userExpensesOwed: { $sum: "$amountOwed" },
          usersThatOwes: {
            $addToSet: {
              expenseId: "expenseId",
              user: "$user",
              amountOwed: "$amountOwed",
            },
          },
        },
      },
    ]);

    const userExpensesPaid = await SharedExpense.aggregate([
      {
        $match: { expenseId: { $in: expenseIds }, isPaid: true },
      },
      {
        $group: {
          _id: null,
          userExpensesPaid: { $sum: "$amountOwed" },
          usersThatPaid: {
            $addToSet: {
              expenseId: "expenseId",
              user: "$user",
              amountPaid: "$amountOwed",
            },
          },
        },
      },
    ]);

    const totalExpenses =
      (expensesCreated[0]?.expensesCreated || 0) +
      (paidSharedExpenses[0]?.totalPaid || 0) -
      (userExpensesPaid[0]?.userExpensesPaid || 0);

    return res.status(200).json({
      expensesCreated: expensesCreated[0] || {
        expensesCreated: 0,
        numofExpenses: 0,
      },
      totalSharedExpenses: totalSharedExpenses[0] || { totalOwed: 0 },
      unpaidSharedExpenses: unpaidSharedExpenses[0] || { totalUnpaid: 0 },
      paidSharedExpenses: paidSharedExpenses[0] || { totalPaid: 0 },
      userExpensesOwed: userExpensesOwed[0] || {
        userExpensesOwed: 0,
        usersThatOwes: [],
      },
      userExpensesPaid: userExpensesPaid[0] || {
        userExpensesPaid: 0,
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
