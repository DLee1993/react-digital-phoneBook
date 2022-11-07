//info - load in mongoose for schema (this will be used to create the structure of the data)
//info - load in config - this is used to set default parameters ( global variables ) i.e mongoURI and use them across the entire project
const mongoose = require("mongoose"),
    config = require("config");

//info this is to access the global variables
const db = config.get('mongoURI')

const connectDB = async () => {
    try {
        await mongoose.connect(db)
        console.log('MongoDB connected')
    } catch (error) {
        console.error(error.message); 
        process.exit(1)
    }
}

module.exports = connectDB; 