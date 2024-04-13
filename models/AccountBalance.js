const mongoose = require('mongoose');

const AccountBalanceSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed'],
      default: 'pending',
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AccountBalance', AccountBalanceSchema);
