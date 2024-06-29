const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    avgRating: {
        type: Number,
    },
    messages: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel",
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        message: {
            type: String,
            trim: true,
            maxlength: [1000, "Max length should be under 1000 characters."],
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
