//! THIS ROUTE IS TO INITALLY SIGN UP / ADD A NEW USER
const express = require("express");
const user = require("../models/User");
const { check, validationResult } = require("express-validator");

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
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        res.send("passed");
    }
);

module.exports = router;