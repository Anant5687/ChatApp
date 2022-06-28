
const mongoose = require('mongoose')
const MessageSchema = mongoose.Schema({
    content: String,
    from: Object,
    SocketId: String,
    time: {
        type:[ String]
    },
    date: String,
    to: String,
})

const Message = mongoose.model("Message", MessageSchema)
module.exports = Message



















// const mongoose = require('mongoose')

// const MessageSchema = mongoose.Schema({
//     conversationId: {
//         type: String
//     },
//     sender: {
//         type: String
//     },
//     text: {
//         type: String
//     }
// }, {
//     timestamps: true
// })

// const Message = mongoose.model('Message', MessageSchema)

// module.exports = Message
