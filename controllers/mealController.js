const asyncHandler = require("express-async-handler");
const Meal = require("../models/mealModel").model;
const APIFeatures = require("../utils/apiFeatures");
var express = require("express");


const createMeal = asyncHandler(async (req, res) => {
    const meal = req.body.meal;
  
    try {
      const newmeal = new Meal({
        name: meal.name,
        image: meal.image,
        description: meal.description,
        price: meal.price,
        protein: meal.protein,
        carbs:meal.carbs,
        sugar:meal.sugar,
        calories:meal.calories
        // ingredients: pizza.ingredients.map((ingredient) => ({
        //   id: ingredient.id,
        //   quantity: ingredient.quantity
        // }))
      });
  
      await newmeal.save();
      res.send('New Meal Added Successfully');
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });








//Get Menu Meals

const getMenuMeals = asyncHandler(async (req, res) => {
  try {
    const query = Meal.find({});
    const queryString = req.query;
    const features = new APIFeatures(query, queryString).filter().paginate();
    const menuItems = await features.query;

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//Get Menu Meals Based on category
const getMealsBasedOnCategory = asyncHandler(async (req, res) => {
  try {
    const allItems = await Meal.find().populate("category");
    const starters = allItems.filter((item) => item.category === "Entrées");
    const mainCourses = allItems.filter(
      (item) => item.category === "Les plats principaux"
    );
    const dessert = allItems.filter((item) => item.category === "Dessert");
    const menuItems = [
      { category: "Entrées", starters: starters },
      { category: "Les plats principaux", mainCourses: mainCourses },
      { category: "Dessert", dessert: dessert },
    ];
    res.status(200).json({ menuItems });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" + error });
  }
});
// if you have time this is better but you have to make a Category model first
// GET LIST OF MEALS BASED ON CATEGORY
//     const params = req.params.category;
//     const cat = params.replace(params.charAt(0), params.charAt(0).toUpperCase());
//     try {
//       const category = await Meal.category.findOne({ name: cat });
//       const meals = await Meal.find({ category: category._id });
//       res.status(200).json({ dishes });
//     } catch (error) {
//       console.log(error);
//       res.sendStatus(400);
//     }
//   });

module.exports = {
  getMenuMeals,
  createMeal,
  getMealsBasedOnCategory,
};
