//! This file is used to send the token when we want to access protected routes i.e. a users contacts
const jwt = require("jsonwebtoken"),
    config = require("config");

module.exports = function (req, res, next) {
    //info - Get the token from the header
    const token = req.header("x-auth-token");

    //info - Check if token exists
    if (!token) {
        //info - If token doesn't exist
        return res.status(401).json({ msg: "No token - Authorisation Denied" });
    }
    //info - If the token does exist the below code will run
    try {
        //info - verify the token matches with the secret
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        //info - Assign the user with the token to req.user
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
