const message = require("../modals/Message")

//Posting Message
const messagePost = async (req, res) => {
    try {
        const newMessage = new message(req.body)
        const saveMessage = await newMessage.save()
        res.status(201).json(saveMessage)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//Getting message
const messageGet = async (req, res) => {
    try {
        const conversation = await message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


module.exports = {
    messagePost,
    messageGet
}