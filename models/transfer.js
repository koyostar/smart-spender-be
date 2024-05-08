const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransferSchema = new Schema(
  {
    transferDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      min: 0,
    },
    expenseId: {
      type: Number,
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transfer", TransferSchema);
