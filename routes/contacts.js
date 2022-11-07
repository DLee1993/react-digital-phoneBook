const express = require("express"),
    router = express.Router();

//! Get all of the users contacts
//info - GET Request
//info - Route - /api/contacts
//info - description - This request will return all of the users contacts
//info - authorisation - Private - This will only be used if a user is logged in
router.get("/", (req, res) => {
    res.send("Get all contacts");
});

//! send data to server | i.e. adding a new contact
//info - POST Request
//info - Route - /api/contacts
//info - description - This request will send data to the server to add a new contact
//info - authorisation - Private - This will only be used if a user is logged in
router.post("/", (req, res) => {
    res.send("Add a contact");
});

//! send data to server | i.e. updating a contacts data
//info - PUT Request
//info - Route - /api/contacts:id (a specific id will be associated with each contact, the id will be used to find them in the database)
//info - description - This request will send data to the server to update the data of a contact
//info - authorisation - Private - This will only be used if a user is logged in
router.put("/:id", (req, res) => {
    res.send("Update a contact");
});

//! send data to server | i.e. adding a new user
//info - DELETE Request
//info - Route - /api/contacts
//info - description - This request will delete a contact from the database
//info - we will find the contact the use wants to delete using the specific id associated with that contact
//info - authorisation - Private - This will only be used if a user is logged in
router.delete("/:id", (req, res) => {
    res.send("Delete a contact");
});

//!  you need to export the router so app ( server.js line 3) can use the requests
module.exports = router;
