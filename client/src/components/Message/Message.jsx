import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Form, Row, Button, Col } from 'react-bootstrap'
import { AppContext } from '../../context/appContext'
import { user } from '../../pages/Login/Login'
import './Message.css'

const Message = () => {
  const Puser = user
  const [messages, setMessages] = useState('')
  const { socket, message, setMessage, currentRoom, memberPrivateMsg } = useContext(AppContext)

  const getFormattedRoom = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString()

    month = month.length > 1 ? month : "0" + month
    let day = date.getDate().toString()

    day = day.length > 1 ? day : "0" + day
    return month + '/' + day + '/' + year

  }

  const todayDate = getFormattedRoom()
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!messages) return
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()
    const time = today.getHours() + ":" + minutes
    const roomId = currentRoom
    socket.emit('message-room',roomId,  messages, Puser, time, todayDate)
    setMessages('')
  }
  return (
    <>
      <div className="messages-optput">
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control placeholder='Type your message' type='text' value={messages} onChange={e => setMessages(e.target.value)}></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button variant='primary' onClick={handleSubmit} style={{ backgroundColor: 'orange' }}>
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default Message
