import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { AuthTokenContext } from '../Accounts/AccountsApi'
import { NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import portfolioImage from '../Images/logo.png'

export default function NavbarCustom() {
  
  const {value} = useContext(AuthTokenContext)
  const {token,name} = value

  const [username,setUsername] = useState(name)

  const imageStyles = {
    height : '40px',
    width : '40px',
    borderRadius : '60px'
  }

  useEffect(()=>{
    const name = localStorage.getItem('name')
    if(name) {
      setUsername(localStorage.getItem('name'))
    }
  },[name])

  return (
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={portfolioImage} style={imageStyles} alt='portfolio'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink as={Link} to="/">Home</NavLink>
            </Nav>
          <Nav>
          {
             token ? 
              (<NavDropdown title={username} id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/blogpost/create">New</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/saved/posts">Saved </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/liked/posts">Liked </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/password/reset">Reset Password</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/password/change">Change Password</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/logout'>Logout</NavDropdown.Item>
               </NavDropdown>
              ) :
              (<>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </>
              )
            }
            <Nav.Link as={Link} to="/support/me">Support Me</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </div>
  )
}
