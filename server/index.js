require('dotenv').config()
require('./DB/database')
const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const signUpRoute = require('./routes/signup.routes')
const loginUpRoute = require('./routes/login.routes')
const port = process.env.PORT || 4000
const Message = require('./modals/Message')
const users = require('./modals/UserSchema')

const app = express()
const rooms = ["General", "Friends", "College", "Family"]
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(signUpRoute)
app.use(loginUpRoute)
app.use(express.static('./routes/uploads'))

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})



app.get('/rooms', (req, res) => {
    res.json(rooms)
})


const getLastMessagesFromRoom = async (room) => {
    let roomMessage =await  Message.aggregate([
        { $match: { to : room } }, {
            $group: { _id: '$date', messagesByDate: { $push: '$$ROOT' } }
        }
    ])
    return roomMessage
}

const SortRoomMessageByDate = (messages) => {
    return messages.sort((a, b) => {
        let date1 = a._id.split('/')
        let date2 = b._id.split('/')

        date1 = date1[2] + date1[0] + date1[1]
        date2 = date2[2] + date2[0] + date2[1]
        return date1 < date2 ? -1 : 1
    })
}
io.on('connection', (socket) => {

    socket.on('new-user', async () => {
        const members = await users.find()
        io.emit('new-user', members)
    })

    socket.on('join-room', async (room) => {
        socket.join(room)

        let roomMessages = await getLastMessagesFromRoom(room)
        roomMessages = SortRoomMessageByDate(roomMessages)
        socket.emit('room-messages', roomMessages)
    })

    socket.on('message-room', (async (room, content, time, sender, date) => {
        console.log(content)
        const newMessage = await Message.create({ to: room, content, time, from: sender, date })
        let roomMessages = await getLastMessagesFromRoom(room)
        roomMessages = SortRoomMessageByDate(roomMessages)

        //Sending message to room
        io.to(room).emit('rrom-message', newMessage)

        //For notifying all group members
        socket.broadcast.emit('notification', room)

    })
    )
})










httpServer.listen(port, () => {
    console.log(`Server is running at ${port}`)
})











///Some additional code



// let users = [];

// console.log(users)

// //Adding user funC
// const addUser = (userId, socketId) => {
//     !users.some((user) => { return (user.userId === userId) }) &&
//         users.push({ userId, socketId })
// }

// const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId)
// }

// const getUser = (userId) => {
//     return users.find(user => user.userId === userId)
// }
// io.on("connection", (socket) => {
//     console.log('a connection created')

//     //For Adding User
//     socket.on('addUser', (userId) => {
//         addUser(userId, socket.id)
//         io.emit('getUser', users)
//     })

//     //GetUser
//     socket.on('sendMessage', ({ senderId, reciverId, text }) => {
//         const user = getUser(reciverId);
//         io.to(user).emit("getMessage", {
//             senderId,
//             text
//         })
//     })

//     //For disconecting user
//     socket.on('disConnect', () => {
//         console.log("user get disconnected")
//         removeUser(socket.id)
//     })
// })
