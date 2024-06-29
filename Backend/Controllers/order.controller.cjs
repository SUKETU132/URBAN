const Order = require("../Models/order.model.cjs");
const Cart = require("../Models/cart.model.cjs");
const mongoose = require("mongoose");

exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch the user's cart and populate items with product details
        const cart = await Cart.findOne({ owner: userId }).populate('items.productId');

        // Check if cart exists and has items
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // Calculate order price
        const orderPrice = cart.items.reduce((total, item) => {
            return total + item.productId.price * item.quantity;
        }, 0);

        // Create a new order
        const newOrder = new Order({
            orderPrice,
            customer: userId,
            items: cart.items.map(item => ({
                productId: item.productId._id,
                size: item.size,
                quantity: item.quantity
            })),
            status: 'pending',
            isPaymentDone: false
        });

        await newOrder.save();

        // Clear the cart after placing the order
        cart.items = [];
        await cart.save();

        res.status(201).json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getOrderData = async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log("Api is hit.");
        // Fetch orders for the logged-in user, excluding the customer field
        const orders = await Order.find({ customer: userId })
            .populate('items.productId', 'name price category mainImage size')
            .select('-customer -__v')
            .select('orderPrice _id')

        if (!orders || orders.length === 0) {
            return next(new Error('No orders found for this user', 404));
        }

        res.status(200).json({
            status: 'success',
            orderData: orders
        });
    } catch (error) {
        console.error('Error fetching order data:', error);
        return next(new ApiError('Internal Server Error', 500));
    }
};

