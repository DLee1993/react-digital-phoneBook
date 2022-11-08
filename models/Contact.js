const mongoose = require("mongoose");

//info - The below user schema is a document structure, this is how you want the information stored

const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
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
        type: String,
    },
    type: {
        type: String, 
        default: 'Personal'
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

//info - Models are responsible for creating and reading documents from the MongoDB database
//info - The first arguement of the modal is the collection in which to store the schema ( 'user' )
//! Please note - if the collection is not already created, mongoDB will create a collection with the name provided
//info - The second arguement is the name of the model ( UserSchema - line 5 )
module.exports = mongoose.model("contacts", ContactSchema);
