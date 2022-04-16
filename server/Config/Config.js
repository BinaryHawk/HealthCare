const nodemailer = require('nodemailer')
const mongoose = require('mongoose')


const hashJWTKey = 'kndf_"éfn&)&é'

const dbPath = 'mongodb://Yacine:JustAPassword@localhost:27017/HealthCare'

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "yacinelamli@gmail.com",
        pass: "B1n4ryH4vvk"
    }
})

module.exports = {
    hashJWTKey,
    dbPath,
    transporter
}