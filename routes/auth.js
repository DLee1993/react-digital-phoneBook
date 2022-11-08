const express = require("express"),
    router = express.Router(),
    User = require("../models/User"),
    { check, validationResult } = require("express-validator"),
    { compare } = require("bcryptjs"),
    jwt = require("jsonwebtoken"),
    config = require("config"),
    auth = require("../middleware/auth");

//! Get the logged in user info to use, so we can fetch their contact list
//info - GET Request
//info - Route - /api/auth
//info - description - This request ask for data from the server, this will allow us to find users and use their data
//info - authorisation - Private - This will only be used if a user is logged in
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//! Authenticate the user and get jwt token
//info - POST Request
//info - Route - /api/auth
//info - description - This request will send information to the server to authenticate the data and generate a json web token
//info - A json web token is used to securely exchange information between the client and server
//info - authorisation - Public - This does not require logging in before use as it happens when the user logs in
router.post(
    "/",
    //info - The below array is checking to make sure the user is entering information into the register inputs
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        //info - The below if statement is checking to see if the validationResults errors has a error
        //info - The return will show a status code of 400 ( bad request ) and also show an array with the errors inside
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //info - deconstructed email and password from request.body
        const { email, password } = req.body;

        try {
            //info - try to find a user with the email entered
            let user = await User.findOne({ email });
            if (!user) {
                //info - if no user exists return status and message
                return res.status(400).json({ msg: "Invalid credentials" });
            }
            //info - if the email exists compare the password entered with the password associated with the above email
            const isMatch = await compare(password, user.password);
            if (!isMatch) {
                //info - if the passwords do not match return status code and message
                return res.status(400).json({ msg: "Invalid credentials" });
            }
            //info - if both the email and password match, generate a token for the user
            //! please refer to users.js ( lines 55 - 78 ) if you need an explanation to the below code
            payload = {
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                    expiresIn: 36000,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
    }
);

//!  you need to export the router so app ( server.js line 3) can use the requests
module.exports = router;
