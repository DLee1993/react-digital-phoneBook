const mongoose = require("mongoose"),
    config = require("config"),
    db = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected')
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
};

module.exports = connectDB;
