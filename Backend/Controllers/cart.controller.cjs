const Cart = require('../Models/cart.model.cjs');
const asyncHandler = require('../Utils/asyncHandler.cjs');
const Product = require('../Models/product.model.cjs');

exports.addToCart = asyncHandler(async (req, res, next) => {
    const { productId, size } = req.body;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await Cart.findOne({ owner: req.user.id });

    // if cart already exsits 
    if (cart) {

        // check if item already exists if yes then just increment quantity otherwise push new item
        const existingItem = cart.items.find(item => item.productId.toString() === productId && item.size === size);

        existingItem ? existingItem.quantity += 1 : cart.items.push({ productId, size, quantity: 1 });

        // Save the cart with version check
        try {
            await cart.save();
            res.status(200).json({ success: true, cart });
        } catch (err) {
            if (err.name === 'VersionError') {
                res.status(409).json({ message: 'Version conflict, please try again' });
            } else {
                throw new Error(err);
            }
        }
    } else {
        const newCart = new Cart({
            owner: req.user.id,
            items: [{ productId, size, quantity: 1 }],
        });

        await newCart.save();
        res.status(201).json({ success: true, newCart });
    }
});

exports.incrementQuantity = asyncHandler(async (req, res, next) => {
    const { productId, size } = req.body;

    if (!productId || !size) {
        return res.status(400).json({ message: "Product ID and size are required." });
    }

    const item = await Product.findById(productId);
    if (!item) {
        return res.status(404).json({ message: "This item is currently not available." });
    }

    const cart = await Cart.findOne({ owner: req.user.id });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found." });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId && item.size === size);
    if (existingItem) {
        existingItem.quantity += 1;

        await cart.save();
        return res.status(200).json({ message: "Quantity incremented.", cart });
    } else {
        return res.status(404).json({ message: "Item not found in cart." });
    }

});

exports.decrementQuantity = asyncHandler(async (req, res, next) => {
    const { productId, size } = req.body;

    if (!productId || !size) {
        return res.status(400).json({ message: "Product ID and size are required." });
    }

    const item = await Product.findById(productId);
    if (!item) {
        return res.status(404).json({ message: "This item is currently not available." });
    }

    const cart = await Cart.findOne({ owner: req.user.id });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found." });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId && item.size === size);
    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
            await cart.save();
            return res.status(200).json({ message: "Quantity decremented.", cart });
        } else {
            cart.items = cart.items.filter(item => !(item.productId.toString() === productId && item.size === size));
            await cart.save();
            return res.status(200).json({ message: "Item removed from cart.", cart });
        }
    } else {
        return res.status(404).json({ message: "Item not found in cart." });
    }
});

//for giving cart detail
exports.getCartData = asyncHandler(async (req, res, next) => {
    const cartData = await Cart.findOne({ owner: req.user.id }).populate({
        path: 'items.productId',
        select: 'name mainImage price stock _id',
    });

    if (!cartData) res.status(404).json({ message: "Cart is empty." });

    res.status(200).json(cartData);
});

// for remove the item from the cart
exports.removeItem = asyncHandler(async (req, res, next) => {

    const { productId, size } = req.body;

    if (!productId || !size) {
        return res.status(400).json({ message: "Product ID and size are required." });
    }

    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    try {
        const cart = await Cart.findOne({ owner: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const initialItemCount = cart.items.length;
        cart.items = cart.items.filter(item => !(item.productId.toString() === productId && item.size === size));

        if (cart.items.length === initialItemCount) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        await cart.save();
        res.status(200).json({ success: true, message: "Item removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while removing the item from the cart" });
    }
});