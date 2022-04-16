const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const config = require('../Config/config.js')
const validationEmailModel = require('../MongoDB/Models/validationEmails')
const userSchema = require('../MongoDB/Models/User')


router.post('/validationGenerator',async (req,res) => {
    try {
        const validationNumber = Math.floor(Math.random()*1000000)
        config.transporter.sendMail({
            from: "yacinelamli@gmail.com",
            to: req.body.email,
            subject: "Validation email",
            text:   `Welcome to Health Care, youll find on this e-mail a confirmation number"
                    ${validationNumber}
                    Please don't share this email
                    Thanks`
        }).then( async ()=> 
        {mongoose.connect(config.dbPath)
         await validationEmailModel.updateOne(
             {email: req.body.email},
             {validationCode: validationNumber},
             { upsert: true })
        res.json({message: 'sent'})})
         } catch (error) {
        res.json({message: 'Couldn\'t sent'})
    } 

})
router.post('/emailValidation',async (req,res) => {
    try {
        mongoose.connect(config.dbPath)
        const data = await validationEmailModel.findOne({email: req.body.email})
        if (req.body.email == data.email && req.body.code == data.validationCode) {
            userSchema.updateOne({email: req.body.email},{validAccount: true})
            res.json({validated : true})
        } else {
            res.json({validated : false})
        }
    } catch (error) {

    }
   
    
})

module.exports = router