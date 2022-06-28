import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import SideBar from '../../components/SideBar/SideBar'
import Message from '../../components/Message/Message'

const Chat = () => {

  
  return (
    <Container>
      <Row>
        <Col md={4}>
          <SideBar />
        </Col>
        <Col md={8}>
          <Message/>
        </Col>
      </Row>
    </Container>
  )
}

export default Chat
