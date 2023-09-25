const mongoose = require("mongoose");

const tableOrderSchema = new mongoose.Schema(
  {
    
    table: {
      type: String,
      required: true,
    },
    orderedMeals: [
      {
        _id: {
          type: mongoose.Schema.ObjectId,
          ref: "Meal",
        },
        quantity: Number,
      },
    ],

    description: String,
    paid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["open", "completed", "delivered"],
      default: "open",

      // errorMessage:
      //   "Invalid status value. Must be 'open', 'completed', or 'delivered'.",
    },
    orderTime: {
      type: Date,
      default: Date.now,
    },
    preparationCompletedAt: {
      type: Date,
      default: null,
    },
    deliveryDate: {
      type: Date,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tableOrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "orderedMeals._id",
    select: ["name", "image", "price"],
    

  });
  next();
});
const TableOrder = mongoose.model("TableOrder", tableOrderSchema);

module.exports = TableOrder;
