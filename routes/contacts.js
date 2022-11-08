const express = require("express"),
    router = express.Router(),
    User = require("../models/User"),
    Contact = require("../models/Contact"),
    { check, validationResult } = require("express-validator"),
    auth = require("../middleware/auth");

//! Get all of the users contacts
//info - GET Request
//info - Route - /api/contacts
//info - description - This request will return all of the users contacts
//info - authorisation - Private - This will only be used if a user is logged in
router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//! send data to server | i.e. adding a new contact
//info - POST Request
//info - Route - /api/contacts
//info - description - This request will send data to the server to add a new contact
//info - authorisation - Private - This will only be used if a user is logged in
router.post(
    "/",
    [auth, [check("name", "Please provide a name").not().isEmpty()]],
    async (req, res) => {
        //info - The below if statement is checking to see if the validationResults errors has a error
        //info - The return will show a status code of 400 ( bad request ) and also show an array with the errors inside
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone, type } = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id,
            });

            const contact = await newContact.save();
            res.json(contact);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

//! send data to server | i.e. updating a contacts data
//info - PUT Request
//info - Route - /api/contacts:id (a specific id will be associated with each contact, the id will be used to find them in the database)
//info - description - This request will send data to the server to update the data of a contact
//info - authorisation - Private - This will only be used if a user is logged in
router.put("/:id", auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    //info - build a contact object to check to see if the fields above have been submitted
    const contactFields = {};
    //info - check to see if the fields have a value of true, meaning they have input
    //info - if its true then the above fields are added to the object
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        //info - find the contact by it's ID
        let contact = await Contact.findById(req.params.id);
        //info - if the contact is not found return a 404 status code
        if (!contact) return res.status(404).json({ msg: "Contact not found" });
        //info - make sure the user owns the contact, this is to ensure nobody outside the user can change contact information
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Authorised to change contact details" });
        }

        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true }
        );
        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//! remove data from server | i.e. deleting a user
//info - DELETE Request
//info - Route - /api/contacts
//info - description - This request will delete a contact from the database
//info - we will find the contact the use wants to delete using the specific id associated with that contact
//info - authorisation - Private - This will only be used if a user is logged in
router.delete("/:id", auth, async (req, res) => {
    try {
        //info - find the contact by it's ID
        let contact = await Contact.findById(req.params.id);
        //info - if the contact is not found return a 404 status code
        if (!contact) return res.status(404).json({ msg: "Contact not found" });
        //info - make sure the user owns the contact, this is to ensure nobody outside the user can change contact information
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Authorised to change contact details" });
        }

        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: "Contact removed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//!  you need to export the router so app ( server.js line 3) can use the requests
module.exports = router;
