//Processes BoutiqueMenu JSON file into Mongo Boutique objects

// var mongoose = require("mongoose");
// const Ingredient = require("../models/ingredientModel").model;
// const fs = require("fs");

// let IngredientData = fs.readFileSync(__dirname + "/ingredients.json");
// IngredientData = JSON.parse(IngredientData).ingredients;
// console.log("Parsed BoutiqueData:", IngredientData); // Debug: Check the content of BoutiqueData

// let IngredientItems = [];
// IngredientData.forEach(ingredient => {
//   IngredientItems.push(new Ingredient(ingredient));
// });

// // Save IngredientItems data to the database
// (async () => {
//   try {
//     await Ingredient.insertMany(IngredientItems);
//     console.log("IngredientItems inserted successfully");
//   } catch (err) {
//     console.error("Error inserting data:", err);
//   }
// })();
