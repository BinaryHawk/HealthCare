const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const userSchema = require('../MongoDB/Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../Config/Config.js')

router.post('/user', async (req,res) => {
    try {
        await mongoose.connect(config.dbPath)
        const newUser = {...req.body, 
            password: await bcrypt.hash(req.body.password, 10),
            email: req.body.email.toLocaleLowerCase()}
            
        const insertedUser = await userSchema.create(newUser)
        const Token = jwt.sign({ 
            email: insertedUser.email 
        }, config.hashJWTKey);     
        res.json({
            Token: Token,
            email: insertedUser.email,
            validAccount: insertedUser.validAccount,
            Code:1
        })
    } catch (err) {
        if (err.code === 11000) {
            res.json({Code:2})
        } else {
            res.json({Code:3})
        }
    }

})

module.exports = router