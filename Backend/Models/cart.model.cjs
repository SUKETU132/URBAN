const mongoose = require("mongoose");
const userModel = require("./user.model.cjs");
const Product = require("./product.model.cjs");

const cartSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
    items: {
        type: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            size: {
                type: String,
                enum: ['S', 'M', 'L', 'XL'],
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity can not be less then 1."],
                default: 1,
            },
        }],
        default: [],
    },
}, { timestamps: true });

const Cart = new mongoose.model("Cart", cartSchema);

module.exports = Cart;