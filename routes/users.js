const express = require("express"),
    router = express.Router(),
    User = require("../models/User"),
    { check, validationResult } = require("express-validator"),
    { genSalt, hash } = require("bcryptjs"),
    jwt = require("jsonwebtoken"),
    config = require("config");

//! send data to server | i.e. adding a new user
//info - POST Request
//info - Route - /api/users
//info - description - This request will send data to the server to register a new user and save the data i.e. name, email
//info - authorisation - Public - this does not require logging in before use
router.post(
    "/",
    //info - The below array is checking to make sure the user is entering information into the register inputs
    [
        check("name", "Please add a name").not().isEmpty().isLength({ min: 3 }),
        check("email", "Please include a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({ min: 6 }),
    ],
    async (req, res) => {
        //info - The below if statement is checking to see if the validationResults errors has a error
        //info - The return will show a status code of 400 ( bad request ) and also show an array with the errors inside
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //info - If everything above passes ( true ) then the below code will run
        const { name, email, password } = req.body;

        try {
            //info - find a user by email
            let user = await User.findOne({ email });
            //info - check to see if the user already exists
            if (user) {
                //info - if the user already exists return a 400 status code
                return res.status(400).json({ msg: "User already exists" });
            }
            //info - if the user doesn't exist, create a new instance of a user
            user = new User({
                name,
                email,
                password,
            });
            //! - in order to keep passwords safe you should always hash them
            //info - genSalt is a part of bcrypt, it adds random hashing per round (i.e. 10)
            const salt = await genSalt(10);
            //info - below is where we hash the password with the genSalt
            user.password = await hash(password, salt);
            //info - Then we save the password to add it to the database
            await user.save();
            //info - The payload is needed to generate a jwt token when a user is registered
            //info - In the payload we specify what we want to be within the token payload, in this case the user id
            const payload = {
                user: {
                    id: user.id,
                },
            };
            //info - The sign function generates the token
            //info - A token is made up of three parts - 
            //info - header(type of token and algorithym used) - 
            //info - payload(user - user.id) - signature - 
            //info - The signature takes all of the above plus the jwtSecret you created ( default.json ) 
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                    //info - The expiresIn will expire the token in the selected time ( i.e. 36000 seconds )
                    //info - After the token expires the user will need to sign in again to continue
                    expiresIn: 36000,
                },
                //info error handling - The below will throw the error is there is one, if not it will respond with the token
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            //info - the catch will log any error and show the error in a message
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

//!  you need to export the router so app ( server.js line 3) can use the requests
module.exports = router;
