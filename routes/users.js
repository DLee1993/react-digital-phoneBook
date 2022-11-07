const express = require("express"),
    router = express.Router(),
    User = require("../models/User"),
    { check, validationResult } = require("express-validator");

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
    (req, res) => {
        //info - The below if statement is checking to see if the validationResults errors has a error
        //info - The return will show a status code of 400 ( bad request ) and also show an array with the errors inside
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //info - If everything above passes ( true ) then res.send will run
        res.send('passed')
    }
);

//!  you need to export the router so app ( server.js line 3) can use the requests
module.exports = router;
