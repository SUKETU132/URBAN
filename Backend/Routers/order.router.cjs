const express = require("express");
const router = express.Router();
const protect = require("../Middleware/protect.middleware.cjs");
const orderController = require("../Controllers/order.controller.cjs");

// for place the order
router.route("/place-order").post(protect, orderController.placeOrder);
router.route("/get-orderdata").get(protect, orderController.getOrderData);

module.exports = router;

