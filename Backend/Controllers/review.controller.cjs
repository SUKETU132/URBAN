const Order = require("../Models/order.model.cjs");
const Review = require("../Models/review.model.cjs");
const User = require("../Models/user.model.cjs");
const asyncHandler = require("../Utils/asyncHandler.cjs");

exports.addReview = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { productId, message, rating } = req.body;
    console.log("This is ", productId, message, rating);

    if (!productId || !message || typeof rating !== 'number') {
        return res.status(400).json({ message: "Product ID, message, and rating are required." });
    }

    const order = await Order.findOne({ customer: userId, 'items.productId': productId, isPaymentDone: true });
    if (!order) {
        return res.status(403).json({ message: "You can only review products you have purchased." });
    }

    const user = await User.findById(userId).select('username profilePic');
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    const existingProductReview = await Review.findOne({ productId });

    let reviewMessage = { userId, message, rating };

    if (existingProductReview) {
        existingProductReview.messages.push(reviewMessage);

        const totalRatings = existingProductReview.messages.reduce((acc, review) => acc + review.rating, rating);
        const totalReviews = existingProductReview.messages.length + 1;
        existingProductReview.avgRating = totalRatings / totalReviews;

        await existingProductReview.save();
    } else {
        const newProductReview = new Review({
            productId,
            avgRating: rating,
            messages: [reviewMessage]
        });
        await newProductReview.save();
    }

    res.status(200).json({
        name: user.username,
        date: Date.now(),
        profilePic: user.profilePic,
        message: "Review added successfully",
        review: { message, rating },
        success: true
    });
});

exports.fetchProductReviews = asyncHandler(async (req, res, next) => {
    const { productId } = req.query;

    const reviews = await Review.find({ productId }).populate({
        path: 'messages.userId',
        select: 'username profilePic',
    });

    const formattedReviews = reviews.map(review => ({
        messages: review.messages.map(message => ({
            username: message.userId.username,
            profilePic: message.userId.profilePic,
            rating: message.rating,
            message: message.message,
            createdAt: message.createdAt,
        }))
    }));

    res.status(200).json(formattedReviews);
});