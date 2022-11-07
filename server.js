//! load in express
const express = require("express"),
    app = express(),
    //info - load in the mongoose db file
    connectDB = require('./config/db'); 
    //! PORT variable - used to store the port that will be used in project
    PORT = process.env.PORT || 5000;

//! Connect the database to the project
connectDB(); 

//! app.get - runs a function ( line 9 ) that gets invoked(used) whenever there is a get request to the specified path
//! in this instance the path is /, which interprets to the website root page or 'home page'
app.get("/", (req, res) => {
    res.json({ msg: "Welcome to the Contact Keeper API" });
});

//info - Define the background routes that will be used in the project

//! /api/users - will be called when we are creating, updating, reading or deleting users
app.use("/api/users", require("./routes/users"));

//! /api/auth - will be used when we need to authorise logins or new users
app.use("/api/auth", require("./routes/auth"));

//! /api/contacts - will be used when we are retrieving the logged in users contact list
app.use("/api/contacts", require("./routes/contacts"));

//! app.listen - listens to the connections on the specified port
app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
