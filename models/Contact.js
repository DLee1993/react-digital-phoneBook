const mongoose = require("mongoose");

//! This creates a modal of what will be added to the user collection for each user
//! This is where you specify all the information you need from each person
const contactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
    },
    contactType: {
        type: String,
        default: "personal",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("contact", contactSchema);
