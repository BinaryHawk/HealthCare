const mongoose = require('mongoose')

const validationEmailModel = new mongoose.model('ValidationEmail', new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    validationCode: {type: Number, required: true},
    sentTime: {type: Date, default: new Date()}
}, {Collection: 'ValidationEmails'}),)

module.exports = validationEmailModel