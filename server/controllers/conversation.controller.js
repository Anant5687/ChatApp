const conversationSchema = require('../modals/Conversation')


const conversationPost = async (req, res) => {
    try {
        const newConversation = new conversationSchema({
            members: [req.body.senderId, req.body.reciverId]
        })
        await newConversation.save()
        res.status(201).json(newConversation)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const conversationGet = async (req, res) => {
    try {
        const conversation = await conversationSchema.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {
    conversationPost,
    conversationGet
}