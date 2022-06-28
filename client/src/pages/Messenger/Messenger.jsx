import Conversation from '../../components/conversation/Conversation'
import Talk from '../../components/Talk/Talk'
import './Messenger.css'
import { user } from '../Login/Login'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { io } from 'socket.io-client'

const Messenger = () => {
    const id = user[0]?._id

    const [conversation, setConversation] = useState([])
    const [message, setMessage] = useState("")
    const [currentChat, setCurrentChat] = useState("")
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMsg, setArrivalMsg] = useState("")
    const ref = useRef()
    const socketObj = useRef()

    useEffect(() => {
        socketObj.current = io('ws://localhost:4000')
        socketObj.current.on('getMessage', data => {
            setArrivalMsg({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMsg && currentChat?.members.includes(arrivalMsg.sender) &&
            setMessage(prev => [...prev, arrivalMsg])
    }, [arrivalMsg, currentChat])

    useEffect(() => {
        socketObj.current.emit('addUser', id)
        socketObj.current.on('getUser', (users) => {
            console.log(users)
        })
    }, [id])

    useEffect(() => {
        const getConversation = () => {
            axios.get(`http://localhost:4000/conversation/` + id).then((response) => {
                setConversation(response.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        getConversation()
    }, [id])
    useEffect(() => {
        const getChat = () => {
            axios.get(`http://localhost:4000/message/${currentChat?._id}`).then((response) => {
                setMessage(response.data)
            }).catch((Err) => {
                console.log(Err)
            })
        }
        getChat()
    }, [currentChat])

    const handleSubmit = (e) => {
        e.preventDefault()
        const messages = {
            sender: id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const reciverId = currentChat.members.find(member => member !== id)

        socketObj.current.emit('sendMessage', {
            userId: id,
            reciverId,
            text: newMessage
        })

        axios.post("http://localhost:4000/message", messages).then((response) => {
            setMessage([...message, response.data])
            setNewMessage("")
            socketObj.emit("message", response.data.text)
        }).catch((err) => {
            console.log(err)
        })

    }

    useEffect(() => {
        ref.current?.scrollIntoView({ behaviour: "smooth" })
    }, [message])

    return (
        <div className='messenger'>
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input type='text' className='chatMenuInput' placeholder='Search name' />
                    {conversation.map((c) => {
                        return (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currUser={id} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ?
                        <><div className="chatBoxTop">
                            {message.map((m) => {
                                return (
                                    <div ref={ref}>
                                        <Talk message={m} own={m.sender === id} />
                                    </div>
                                )
                            })}
                        </div>
                            <div className="chatBoxBottom">
                                <textarea className='chatMessageInput'
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder='Write something...'
                                    value={newMessage}>
                                </textarea>

                                <button className='chatSubmitButton' onClick={handleSubmit}>
                                    Send
                                </button>
                            </div>
                        </> : <span className='noConversation'>Open a chat....</span>}
                </div>
            </div>
        </div>
    )
}

export default Messenger
