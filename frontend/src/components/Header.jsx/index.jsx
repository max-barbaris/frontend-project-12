import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { selectIsAuth, clearAuth } from '../../features/auth/authSlice'
import { PAGES } from '../../navigation/pageRoutes'

const Header = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  const logout = () => {
    dispatch(clearAuth())
  }

  return (
    <Navbar className="shadow-sm bg-white">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand as={Link} to={PAGES.MAIN}>
          {t('global.hexletChat')}
        </Navbar.Brand>
        {isAuth && <Button onClick={logout}>{t('header.logout')}</Button>}
      </Container>
    </Navbar>
  )
}

export default Header
