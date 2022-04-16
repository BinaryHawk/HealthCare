const express = require("express")
const router = express.Router()

router.post('/login', (req,res) => {
    
    try {
        console.log(req.body)
        res.json({message:' successfully in'})
    } catch (error) {
        res.json({message: 'User not found, check your inputs'})
    }

})

module.exports = router