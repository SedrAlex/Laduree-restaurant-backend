const mongoose = require("mongoose");
const { Schema } = mongoose;

const mealSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
   },
  description: {
    type: String,
    required: true,
  },
    category: {
      type: String,
    },
  image: {
    type: String,
    required: true,
  },
  protien: Number,
  carbs: Number,
  sugar: Number,
  calories: Number,
  // // Cecken 10g  and Bread 2g
  // ingredients: [
  //   {
  //     ingredient: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "Ingredient",
  //       required: true,
  //     },
  //     quantity: { type: Number, default: 1 },
  //   },
  // ],
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports.model = Meal;
module.exports.schema = mealSchema;
