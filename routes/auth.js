//! THESE ROUTES ARE TO AUTHENTICATE A USER WHEN THEY TRY TO LOG IN

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const { genSalt, hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require('../middleware/auth'); 
const { findById } = require("../models/User");

//INFO - @route GET - /api/auth
//INFO - @description Get logged in User
//INFO - @access Private

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user); 
    } catch (error) {
        console.error(error.msg)
        res.status(500).send('server error')
    }
});

//INFO - @route POST - /api/auth
//INFO - @description Auth user and get Token
//INFO - @access Public

router.post(
    "/",
    [
        check("email", "please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: "Invalid Credentials" });
            const isMatch = await compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" });

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                    expiresIn: 3600000,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.msg);
            res.status(500).send("server error");
        }
    }
);

module.exports = router;
