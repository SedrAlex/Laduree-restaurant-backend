require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors  = require("cors");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middlewares/errorMiddleware");

require("./data/allTables.js")
require("./data/boutiquMenu")
require("./data/menuDishes")
require("./data/CreateOrders")

const boutiqueRoute = require("./routes/boutiqueItemsRoute");
const orderRoute = require("./routes/orderRoute")
const mealsRoute = require("./routes/mealsRoute")
const blogRoute = require("./routes/blogRoute")

// Security
const rateLimit = require("express-rate-limit");

// Limit requests  from The same ip 100 request
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //per 1 hour
  message: "Too many requests from this IP ,please try again in an hour!",
});

const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
     cors({
          origin: ["http://localhost:3000", ""], //add the following link to this cors 
          credentials:true
     })
);

//Routes
app.use("/api/users",userRoute)
app.use("/api/availability", require("./routes/availabilityRoute"));
app.use("/api/reservation", require("./routes/reservationRoute"));
app.use("/api/boutique",boutiqueRoute)
app.use("/api/posts",blogRoute)
app.use("/api/boutique/orders",orderRoute)
app.use("/api/menu",mealsRoute)


app.get("/", (req, res) => {
     res.send("Home Page");
})
var db = mongoose.connection;


//Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000;





mongoose
       .connect(process.env.MONGO_URI)
       .then(() => {
          app.listen(PORT, () => {
               console.log(`Server running on ${PORT}`);
          });
       })
       .catch((err) => console.log(err));
       


  
  