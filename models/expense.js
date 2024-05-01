const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    incurredDate: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: ["Travel", "Food", "Accommodation"],
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// expenseSchema.virtual('paidAmt').get(function() {});

module.exports = mongoose.model("Expense", expenseSchema);
