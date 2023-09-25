var mongoose = require("mongoose");
// const Order = require("../models/orderModel").model;
// const fs = require("fs");

// let OrdersData = fs.readFileSync(__dirname + "/Orders.json");
// OrdersData = JSON.parse(OrdersData).orders;
// console.log("Parsed OrdersData:", OrdersData); // Debug: Check the content of MenuData

// let OrdersItems = [];
// OrdersData.forEach(order => {
//     OrdersItems.push(new Order(order));
// });

// // Save BoutiqueItems data to the database
// (async () => {
//   try {
//     await Order.insertMany(OrdersItems);
//     console.log("OrdersItems  inserted successfully");
//   } catch (err) {
//     console.error("Error inserting data:", err);
//   }
// })();