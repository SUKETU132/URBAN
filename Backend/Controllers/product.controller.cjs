const Review = require("../Models/review.model.cjs");
const uploadOnCloudinary = require("../Utils/FileUpload.cjs");
const Product = require("../Models/product.model.cjs");
const asyncHandler = require("../Utils/asyncHandler.cjs");


// for upload product data in database
exports.uploadProductData = asyncHandler(async (req, res) => {
    try {
        const { name, description, category, stock, price } = req.body;
        const mainImageFile = req.files['mainImage'][0];
        const subImageFiles = req.files['subImages'] || [];

        // Upload main image to Cloudinary
        const mainImageResult = await uploadOnCloudinary(mainImageFile.path);
        if (!mainImageResult) {
            return res.status(500).json({ message: 'Failed to upload main image to Cloudinary' });
        }

        // Upload sub images to Cloudinary
        const subImageResults = await Promise.all(subImageFiles.map(file => uploadOnCloudinary(file.path)));
        if (subImageResults.includes(null)) {
            return res.status(500).json({ message: 'Failed to upload one or more sub images to Cloudinary' });
        }

        const subImages = subImageResults.map(result => ({ url: result.url }));

        // Create new product
        const newProduct = new Product({
            name,
            description,
            category,
            mainImage: { url: mainImageResult.url },
            owner: req.user.id,
            stock,
            price,
            subImages,
        });

        await newProduct.save();
        console.log("Product added successfully");
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
});

// for sending the all product from the data base
exports.AllProduct = asyncHandler(async (req, res, next) => {
    const products = await Product.find();

    if (!products) return res.status(404).json({ message: "No products found" });

    const productsWithReviews = await Promise.all(products.map(async (product) => {
        const reviews = await Review.findOne({ productId: product._id });

        const avgRating = reviews ? reviews.avgRating : 0;
        const reviewCount = reviews ? reviews.messages.length : 0;

        return {
            ...product.toObject(),
            avgRating,
            reviewCount
        };
    }));

    return res.status(200).json({ products: productsWithReviews });
});

// for fetching the product which is matching with owner of product id
exports.AllProductMatchingWithAdmin = asyncHandler(async (req, res, next) => {
    const ownerId = req.user.id;

    const products = await Product.find({ owner: ownerId });

    if (!products) return res.status(404).json({ message: "No products found" });

    const productsWithReviews = await Promise.all(products.map(async (product) => {
        const reviews = await Review.findOne({ productId: product._id });

        const avgRating = reviews ? reviews.avgRating : 0;
        const reviewCount = reviews ? reviews.messages.length : 0;

        return {
            ...product.toObject(),
            avgRating,
            reviewCount
        };
    }));

    return res.status(200).json({ products: productsWithReviews });
});

// for delete the product 
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    try {
        console.log("Delete Api is hit.");
        const { id } = req.body;
        const product = await Product.findById(id);

        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        await product.deleteOne();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
});

// for populer section of site
exports.getPopulerProducts = asyncHandler(async (req, res, next) => {

});

// for new collection
exports.newCollection = asyncHandler(async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.status(200).json(products);
    } catch (error) {
        throw new Error(error);
    }
});