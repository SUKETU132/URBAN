const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("../Routers/user.router.cjs");
const productRouter = require("../Routers/product.router.cjs");
const cartRouter = require("../Routers/cart.router.cjs");
const orderRouter = require("../Routers/order.router.cjs");
const reviewRouter = require("../Routers/review.router.cjs");

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));  // for cross origin conflict resolution

app.use(express.json({
    limit: "16kb",
}));  // to access json data

app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
})); // for encoded url for example %suketu%op like this or suketu+op like this in url

app.use(express.static("public"));
app.use(cookieParser());  // for accessing the cookie from the client browser and performing crud operation on it  

app.use("/api/v1/users", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/review", reviewRouter);

module.exports = app;