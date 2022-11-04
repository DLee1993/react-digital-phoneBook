//! MONGODB STRUCTURE
//// DATABASE - DIGITAL PHONEBOOK
///// COLLECTION - USERS
////// USER COLLECTION - CONTACTS

const express = require("express"),
    app = express(),
    PORT = process.env.PORT || 5000,
    connectDB = require("./config/db");

connectDB();

//! initialise middleware
app.use(express.json());

app.get("/", (req, res) => res.json({ msg: "Welcome to the Digital PhoneBook" }));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => console.log("Server started on port: " + PORT));
