import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import MainPage from './pages/Main'
import NotFoundPage from './pages/NotFoundPage'
import { useSelector } from 'react-redux'
import { selectIsAuth } from './features/auth/authSlice'
import Header from './components/Header.jsx'

function App() {
  const isAuth = useSelector(selectIsAuth)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={isAuth ? <MainPage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!isAuth ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
};

export default App
