import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import Signup from './components/Auth/SignUp.jsx'
import MainPage from './pages/Main'
import NotFoundPage from './pages/NotFoundPage'
import { useSelector } from 'react-redux'
import { selectIsAuth } from './features/auth/authSlice'
import Header from './components/Header.jsx'

const App = () => {
  const isAuth = useSelector(selectIsAuth)

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Routes>
        <Route path="/" element={isAuth ? <MainPage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!isAuth ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
