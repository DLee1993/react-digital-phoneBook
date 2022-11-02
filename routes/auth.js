//! THESE ROUTES ARE TO AUTHENTICATE A USER WHEN THEY TRY TO LOG IN

const express = require('express'); 

const router = express.Router(); 


//INFO - @route GET - /api/auth 
//INFO - @description Get logged in User
//INFO - @access Private

router.get("/", (req, res) => {
    res.send('Get logged in user')
});

//INFO - @route POST - /api/auth 
//INFO - @description Auth user and get Token
//INFO - @access Public

router.post("/", (req, res) => {
    res.send('Log in user')
}); 


module.exports = router; 