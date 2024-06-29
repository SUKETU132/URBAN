const express = require("express");
const router = express.Router();
const protect = require("../Middleware/protect.middleware.cjs");
const cartController = require("../Controllers/cart.controller.cjs");

// for adding the cart.
router.route("/add-to-cart").post(protect, cartController.addToCart);
router.route("/increment-quantity").patch(protect, cartController.incrementQuantity);
router.route("/decrement-quantity").patch(protect, cartController.decrementQuantity);
router.route("/get-cart-data").get(protect, cartController.getCartData);
router.route("/remove-item").delete(protect, cartController.removeItem);

module.exports = router;
    
