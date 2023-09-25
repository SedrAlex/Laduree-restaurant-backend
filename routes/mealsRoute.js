const express = require("express");
const Meal = require("./../models/mealModel").model;

const {
  getMenuMeals,
  getMealsBasedOnCategory,
} = require("../controllers/mealController");
const router = express.Router();

router.get("/getallmeals", getMenuMeals);
router.get("/meals-by-categories", getMealsBasedOnCategory);



module.exports = router;
