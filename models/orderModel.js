const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "order name required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    userid: {
      type: String,
      require
    },
    orderItems: [],
    shippingAddress: {
      type:Object
    },
    orderAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3],
      default: 0
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

module.exports = mongoose.model("Order", orderSchema);
module.exports.model = Order;
module.exports.schema = orderSchema;
