require('dotenv').config();
require('./config/database');

const Expense = require('./models/expense');
const SharedExpense = require('./models/sharedExpense');

(async function() {

  await Expense.deleteMany({});
  const expenses = await Expense.create([
    {
      createdBy: "66309c4857928a5260a8db76",
      incurredDate: "2024-03-02",
      category: "Accommodation",
      amount: 320,
      description: "Taiwan Hotel"
    },
    {
      createdBy: "6630ca5c0a326402b408f5de",
      incurredDate: "2024-01-20",
      category: "Food",
      amount: 50,
      description: "Tze char at Hougang"
    },
    {
      createdBy: "6630ca5c0a326402b408f5de",
      incurredDate: "2024-02-28",
      category: "Travel",
      amount: 1398,
      description: "4pax flight ticket to Taiwan"
  }
  ]);

  await SharedExpense.deleteMany({});
  const sharedExpenses = await SharedExpense.create([
    {
      expenseId: 1,
      user: "66310d76c827d622d3e67526",
      amountOwed: 160,
    },
    {
      expenseId: 2,
      user: "66309c4857928a5260a8db76",
      amountOwed: 12,
    },
    {
      expenseId: 2,
      user: "6630ced833a3e6ead6844e72",
      amountOwed: 20,
    },
    {
      expenseId: 3,
      user: "66309c4857928a5260a8db76",
      amountOwed: 317,
    },
    {
      expenseId: 3,
      user: "6630ced833a3e6ead6844e72",
      amountOwed: 401,
    },
    {
      expenseId: 3,
      user: "6631b330e714c3fe3d0667dc",
      amountOwed: 348,
    },
  ]);

  console.log('expenses', expenses);
  console.log('shared expenses', sharedExpenses)

  process.exit();

})();