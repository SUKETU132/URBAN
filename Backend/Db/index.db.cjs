const mongoose = require("mongoose");
const DB_Name = require('../Server/constants.cjs');

const connectDB = async () => {
    try {
        const connetctionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`);
        console.log(`\n MongoDB connected || DB HOST: ${connetctionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB Connection error ", error);
        process.exit(1);
    }
}

module.exports = connectDB;