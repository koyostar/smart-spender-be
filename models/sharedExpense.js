const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sharedExpenseSchema = new Schema(
  {
    expenseId: {
      type: Number,
      ref: "Expense",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amountOwed: {
      type: Number,
      default: 0,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("SharedExpense", sharedExpenseSchema);
