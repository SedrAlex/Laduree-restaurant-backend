const fs = require("fs");

const Category = require("./../models/categoryModel");
const Ingredient = require("./../models/ingredientModel");
const Meal = require("./../models/mealModel").model;

const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.MONGO_URI;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/categories.json`, "utf-8")
);
const meals = JSON.parse(
  fs.readFileSync(`${__dirname}/meals-with-ingredients.json`, "utf-8")
);
const ingredients = JSON.parse(
  fs.readFileSync(`${__dirname}/ingredients.json`, "utf-8")
);

const importData = async () => {
  try {
    await Category.create(categories);
    await Ingredient.create(ingredients);
    await Meal.create(meals);
  } catch (err) {}
  process.exit();
};

const deleteData = async () => {
  try {
    await Category.deleteMany();
    await Ingredient.deleteMany();
    await Meal.deleteMany();
  } catch (err) {}

  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

// run : node ./data/allCategories.js --import
// run : node ./data/allCategories.js --delete
