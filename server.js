const express = require("express"),
    app = express(),
    PORT = process.env.PORT || 3000,
    connectDB = require("./config/db"); 

connectDB(); 

app.get("/", (req, res) => res.json({ msg: "Welcome to the Digital PhoneBook" }));

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

app.listen(PORT, () => console.log("Server started on port: " + PORT));