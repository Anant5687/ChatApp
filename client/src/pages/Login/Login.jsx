import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap'
import './Login.css'
import { Link } from 'react-router-dom'
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {AppContext} from '../../context/appContext'

export const user = []

const Login = () => {
  const navigate = useNavigate()
  const {socket} = useContext(AppContext)
  const [data, setData] = useState({
    email: "",
    password: ""
  })
    ;
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const onChangeHandeler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const onClickHandelr = () => {
    setLoading(true)
    axios.post("http://localhost:4000/login", data).then((response) => {
      console.log(response.data.savedUser)
      localStorage.setItem('token', JSON.stringify(response.data.savedUser))
      user.push(response.data.savedUser)
      console.log("userdata ", user )
      setError(false)
      setLoading(false)
      navigate('/chat')
      socket.emit('new-user')
      setData({
        email: "",
        password: ""
      })
    }).catch((err) => {
      console.log(err)
      setError(true)
      setLoading(false)
    })
    console.log(data)
  }

  const onSubmitHandeler = (e) => {
    e.preventDefault()
  }
  return (
    <Container>
      <Row>
        <Col md={5} className='login__bg'>

        </Col>
        <Col md={7} className="d-flex flex-direction-column align-items-center justify-content-center">
          <Form style={{ width: '80%', maxWidth: 500 }} onSubmit={onSubmitHandeler}>
            {loading && <Loading type="Loading please wait" />}
            {error && <Error type="CHeck your credintals" />}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name='email' value={data.email} onChange={onChangeHandeler} placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name='password' value={data.password} onChange={onChangeHandeler} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={onClickHandelr}>
              Login
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Don't have an account <Link to='signup'>Signup</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
