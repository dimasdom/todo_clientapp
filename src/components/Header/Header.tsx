import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Header:React.FC = () => {
    return(
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Le Carnet</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Item ><Link to="/">Home</Link></Nav.Item>
      <Nav.Item ><Link to="/userPage">Profile</Link></Nav.Item>
      
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}

export default Header