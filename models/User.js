const mongoose = require('mongoose'); 

//! This creates a modal of what will be added to the user collection for each user
//! This is where you specify all the information you need from each person
const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
}); 

module.exports = mongoose.model('user', userSchema); 