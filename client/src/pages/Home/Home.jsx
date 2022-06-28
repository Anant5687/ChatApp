import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import './Home.css'


const Home = () => {
  useEffect(()=>{
    localStorage.removeItem('token')
  },[])
  return (
    <div>
      <Row>
        <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
          <div>
          <h1>Share your thoughts</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium?</p>
          <LinkContainer to='/chat'>
            <Button variant='success'>
              Lets Go
            </Button>
          </LinkContainer>
          </div>
        </Col>
        <Col className='home__bg'></Col>
      </Row>
    </div>
  )
}

export default Home
