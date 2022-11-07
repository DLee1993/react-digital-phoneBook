const express = require("express"),
    router = express.Router();

//! Get the logged in user info to use, so we can fetch their contact list
//info - GET Request
//info - Route - /api/auth
//info - description - This request ask for data from the server, this will allow us to find users and use their data
//info - authorisation - Private - This will only be used if a user is logged in
router.get("/", (req, res) => {
    res.send("Get the logged in user");
});

//! Authenticate the user and get jwt token
//info - POST Request
//info - Route - /api/auth
//info - description - This request will send information to the server to authenticate the data and generate a json web token
//info - A json web token is used to securely exchange information between the client and server
//info - authorisation - Public - This does not require logging in before use as it happens when the user logs in
router.post("/", (req, res) => {
    res.send("Log in user");
});

//!  you need to export the router so app ( server.js line 3) can use the requests
module.exports = router;