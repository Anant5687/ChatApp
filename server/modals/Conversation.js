const mongoose = require('mongoose')
const ConversationSchema = mongoose.Schema({
   members :{
        type:[]
    }
}, {
    timeStamps:true
})

const Conversation = mongoose.model("Conversation",ConversationSchema )

module.exports = Conversation