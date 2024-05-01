const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sharedExpenseSchema = new Schema({
    expenseId: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amountOwed: {
        type: Number,
        default: 0
    },
    isPaid: {
        type: Boolean,
    }
}, {
  toJSON: { virtuals: true }
});

module.exports = mongoose.model('SharedExpense', sharedExpenseSchema);