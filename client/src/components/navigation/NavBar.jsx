import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { user } from '../../pages/Login/Login';

const NavBar = () => {
  const [apiData, setApiData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:4000/data').then((response) => {
      setApiData(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  const image = ["data:image/png;base64,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"]

  const onClickHandeler = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <LinkContainer to='/'>
            <Navbar.Brand >
              <img style={{ width: 50, height: 50 }} src={image} />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {user ? <> <LinkContainer to='login'>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
                <LinkContainer to='chat'>
                  <Nav.Link>Chat</Nav.Link>
                </LinkContainer>
              </>
                :
                <>
                  <Navbar.Brand >
                    <img style={{ width: 50, height: 50, borderRadius:40 }} src={user.file} />
                  </Navbar.Brand>
                  <NavDropdown title={user.name} id="basic-nav-dropdown">
                    <NavDropdown.Item style={{ marginRight: 80 }}>
                      <Button onClick={onClickHandeler}>
                        Logout
                      </Button>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </NavDropdown>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar
