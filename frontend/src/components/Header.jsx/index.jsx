import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar className="shadow-sm bg-white">
      <Container className="d-flex justify-content-beetween">
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
