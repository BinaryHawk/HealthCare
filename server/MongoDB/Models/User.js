const mongoose = require('mongoose')

const userSchema = new mongoose.model('user', new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    validAccount: {type: Boolean, default: false}
}, {Collection: 'Users'}),)

module.exports = userSchema