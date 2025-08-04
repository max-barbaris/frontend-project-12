import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Navbar, Container } from 'react-bootstrap'
import { selectIsAuth, clearAuth } from '../../features/auth/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  const logout = () => {
    dispatch(clearAuth())
  }

  return (
    <Navbar className="shadow-sm bg-white">
      <Container className="d-flex justify-content-beetween">
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        {isAuth && <Button onClick={logout}>Выйти</Button>}
      </Container>
    </Navbar>
  )
}

export default Header
