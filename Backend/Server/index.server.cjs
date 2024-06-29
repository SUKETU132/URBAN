// Shree Krishna

const path = require('path');
const dotenvPath = path.resolve(__dirname, '../.env'); // Correct path to .env
require('dotenv').config({ path: dotenvPath });
const color = require('colors');
const app = require("./app.cjs");
const connectDB = require("../Db/index.db.cjs");

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5500, () => {
            console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })

