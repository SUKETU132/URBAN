const express = require("express");
const authController = require("../Controllers/auth.controller.cjs");
const protect = require("../Middleware/protect.middleware.cjs");
const router = express.Router();
const upload = require("../Middleware/Multer.middleware.cjs");

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/getotp").post(authController.getVarified);
router.route("/verifyotp").post(authController.verifyOtp);
router.route("/change-role").patch(protect, authController.changeRole);
router.route("/get-email-change-otp").post(protect, authController.changeEmailVerificationOtpReq);
router.route("/verify-email-change-otp").post(protect, authController.changeEmailVerifyOtp);
router.route("/resetPassword/:token").patch(authController.resetPassword);
router.route("/deleteMe").delete(protect, authController.deleteMe);
router.route("/getCurrentUser").get(protect, authController.getCurrentUser);
router.route("/updateUser").put(protect, upload.single('mainImage'), authController.updateProfile);
router.route("/addAddress").post(protect, authController.createAddress);

module.exports = router;
