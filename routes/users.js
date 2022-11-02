const express = require('express'); 

const router = express.Router(); 


//INFO - @route POST - /api/users 
//INFO - @description Register a User
//INFO - @access Public


router.post("/", (req, res) => {
    res.send('Register a user')
}); 


module.exports = router; 