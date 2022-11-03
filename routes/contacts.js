//! THESE ROUTES ARE FOR THE USER TO ACCES THEIR CONTACTS LIST

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Contact = require("../models/Contact");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const contact = require("../models/Contact");

//INFO - @route GET - /api/contacts
//INFO - @description Get all users contacts
//INFO - @access Private

router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//INFO - @route POST - /api/users
//INFO - @description Add new contact
//INFO - @access Private

router.post("/", [auth, [check("name", "Name is required").not().isEmpty()]], async (req, res) => {
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
        res.status(500).send("server error");
    }
});

//INFO - @route PUT - /api/users/:id
//INFO - @description Update a contact
//INFO - @access Public

router.put("/:id", auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    // update information of contact
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: "Contact not found" });

        //! Make sure the conact is in the users list
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorised to edit contact" });
        }
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true }
        );
        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//INFO - @route DELTE - /api/users/:id
//INFO - @description Delete a Contact
//INFO - @access Public

router.delete("/:id", auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: "Contact not found" });

        //! Make sure the conact is in the users list
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorised to edit contact" });
        }
        await Contact.findByIdAndRemove(req.params.id)
        res.json({msg: 'Contact removed from list'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

module.exports = router;
