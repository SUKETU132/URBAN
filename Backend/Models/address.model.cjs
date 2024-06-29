const mongoose = require("mongoose");
const { default: userModel } = require("./user.model.cjs");

const addressSchema = new mongoose.Schema(
    {
        addressLine1: {
            required: true,
            type: String,
        },
        addressLine2: {
            type: String,
        },
        city: {
            required: true,
            type: String,
        },
        country: {
            required: true,
            type: String,
        },
        owner: {
            ref: "userModel",
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
        },
        pincode: {
            required: true,
            type: String,
        },
        state: {
            required: true,
            type: String,
        },
    },
    { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;