const express = require("express");
const router = express.Router();
const reviewController = require("../Controllers/review.controller.cjs");
const protect = require("../Middleware/protect.middleware.cjs");

router.route("/add-review").post(protect, reviewController.addReview);
router.route("/fetch-product-detail").get(protect, reviewController.fetchProductReviews);

module.exports = router;

