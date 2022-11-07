const express = require("express"),
    router = express.Router();

//! send data to server | i.e. adding a new user
//info - POST Request
//info - Route - /api/users
//info - description - This request will send data to the server to register a new user and save the data i.e. name, email
//info - authorisation - Public - this does not require logging in before use
router.post("/", (req, res) => {
    res.send("Register a user");
});

//!  you need to export the router so app ( server.js line 3) can use the requests
module.exports = router;
