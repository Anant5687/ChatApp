import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/Loading';
import axios from 'axios'
import Error from '../../components/error/Error'

const SignUp = () => {
  const [file, setFile] = useState("")
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const onChnageHandeler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const fileChangeHandeler = (e) => {
    setFile(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }


  const onClickHandeler = () => {

    //Converting JSON data to FormData
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('file', file)
    console.log(formData)
    console.log(data, file)


    //configuration method for sending Form Data
    const configAxios = {
      headers: {
        "content-type": 'multipart/form-data'
      }
    }

    //Axios Call
    setLoading(true)
    axios.post("http://localhost:4000/signup", formData, configAxios).then((response) => {
      console.log(response.data)
      setError(false)
      setLoading(false)
      setFile("")
      setData({
        name: "",
        email: "",
        password: ""
      })
      navigate('/login')
    }).catch((err) => {
      console.log(err)
      setError(true)
      setLoading(false)
    })
  }



  const onSubmitHandelr = (e) => {
    e.preventDefault()
  }

  return (
    <Container>
      <Row>
        <Col md={7} className="d-flex flex-direction-column align-items-center justify-content-center">
          <Form style={{ width: '80%', maxWidth: 500 }} onSubmit={onSubmitHandelr}>
          {loading && <Loading type="Please wait" />}
          {error && <Error type="some thing went wrong" />}
            <h1 className='text-center'>Create ID</h1>
            <div className='signup-profile-pic_container'>
              <img src={imagePreview || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzjyzVridh3cRSgSPAdQ1AhduuZ1fW8hlulA&usqp=CAU"} className="signup-profile-pic" />
              <label htmlFor="image-upload" className='image-upload-label'>
                +
              </label>
              <input type="file" id='image-upload' name='file' hidden onChange={fileChangeHandeler} accept='image/jpeg, image/png' />
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name='name' onChange={onChnageHandeler} value={data.name} placeholder="Enter name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name='email' onChange={onChnageHandeler} value={data.email} placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name='password' value={data.password} onChange={onChnageHandeler} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={onClickHandeler} type="submit">
              Signup
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Already have an account? <Link to='/login'>Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className='signup__bg'>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUp
