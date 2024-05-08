const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    expenseId: {
      type: Number,
    },
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
      enum: ["travel", "food", "accommodation"],
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

expenseSchema.plugin(AutoIncrement, { inc_field: 'expenseId' });

module.exports = mongoose.model("Expense", expenseSchema);
