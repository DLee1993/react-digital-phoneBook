//! THIS ROUTE IS TO INITALLY SIGN UP / ADD A NEW USER
const express = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const { genSalt, hash } = require("bcryptjs");

const router = express.Router();

//INFO - @route POST - /api/users
//INFO - @description Register a User
//INFO - @access Public

router.post(
    "/",
    [
        check("name", "Please add a name").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            user ? res.status(400).json({ error: "User already exists" }) : null;
            user = new User({ name, email, password });
            const salt = await genSalt(10)
            user.password = await hash(password, salt); 
            await user.save()
            res.send('user saved')
        } catch (error) {
            console.error(error.msg)
            res.status(500).send('server error')
        }
    }
);

module.exports = router;
