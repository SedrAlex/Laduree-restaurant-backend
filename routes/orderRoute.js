const express = require("express");
const { placeOrders, getUserOrders, getAllOrders, deliverOrders } = require("../controllers/customers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router()

router.post("/placeorder", placeOrders);
router.post("/getuserorders",getUserOrders)
router.get("/getallorders",getAllOrders)
router.put("/deliverorder",deliverOrders)

module.exports = router