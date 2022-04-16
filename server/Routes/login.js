const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const userSchema = require('../MongoDB/Models/User')
const config = require('../Config/Config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login', async (req,res) => {
    
    try {
        mongoose.connect(config.dbPath)
        const user = await userSchema.findOne({email: req.body.email})
        if (!user) {
            res.json({code:2})
        } else {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const Token = jwt.sign({
                    email: user.email
                },config.hashJWTKey)
                res.json({code:1, Token: Token})
            } else {
                res.json({code: 3})
            }
        }
    } catch {
        res.json({code: 4})
    }
})

module.exports = router