const mongoose = require('mongoose')

const UserData = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    newMessage: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        default: 'Online'
    }
},
    {
        minimize: false
    })

const users = mongoose.model('users', UserData)

module.exports = users