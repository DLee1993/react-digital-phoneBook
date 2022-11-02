//! THESE ROUTES ARE FOR THE USER TO ACCES THEIR CONTACTS LIST

const express = require('express'); 

const router = express.Router(); 


//INFO - @route GET - /api/contacts
//INFO - @description Get all users contacts
//INFO - @access Private

router.get("/", (req, res) => {
    res.send('Get all contacts')
}); 

//INFO - @route POST - /api/users 
//INFO - @description Add new contact
//INFO - @access Public

router.post("/", (req, res) => {
    res.send('Add new contact')
}); 

//INFO - @route PUT - /api/users/:id 
//INFO - @description Update a contact
//INFO - @access Public

router.put("/:id", (req, res) => {
    res.send('Contact updated')
}); 

//INFO - @route DELTE - /api/users/:id 
//INFO - @description Delete a Contact
//INFO - @access Public

router.delete("/:id", (req, res) => {
    res.send('Delete contact')
}); 


module.exports = router; 