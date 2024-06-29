const mongoose = require("mongoose");
const { default: Product } = require("./product.model.cjs");
const { default: userModel } = require("./user.model.cjs");

const orderSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
    items: {
        type: [
            {
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
            },
        ],
        default: [],
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'success', 'failed'],
    },
    // This field shows if the payment is done or not
    isPaymentDone: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
