const express = require("express");
const router = express.Router();
const upload = require("../Middleware/Multer.middleware.cjs");
const protect = require("../Middleware/protect.middleware.cjs");
const productFunc = require("../Controllers/product.controller.cjs");
const authorizeAdmin = require("../Middleware/authorizeAdmin.cjs");

// for adding the product from the admin pannel
router.route("/add-product").post(protect, authorizeAdmin, upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'subImages', maxCount: 4 }]), productFunc.uploadProductData);
router.route("/all-product").get(protect, productFunc.AllProduct);
router.route("/all-product-with-owner").get(protect, productFunc.AllProductMatchingWithAdmin);
router.route("/delete-product").delete(protect, authorizeAdmin, productFunc.deleteProduct);
// router.route("/populer-product").get(protect,);
router.route("/new-collection").get(productFunc.newCollection);

module.exports = router;

