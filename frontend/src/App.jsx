import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'

import Header from './components/Header.jsx'
import LoginPage from './pages/Login.jsx'
import Signup from './pages/SignUp.jsx'
import MainPage from './pages/Main.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { selectIsAuth } from './features/auth/authSlice'
import { PAGES } from './navigation/pageRoutes'

const App = () => {
  const isAuth = useSelector(selectIsAuth)

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path={PAGES.MAIN} element={isAuth ? <MainPage /> : <Navigate to="/login" replace />} />
          <Route path={PAGES.LOGIN} element={!isAuth ? <LoginPage /> : <Navigate to="/" replace />} />
          <Route path={PAGES.NOT_FOUND} element={<NotFoundPage />} />
          <Route path={PAGES.SIGNUP} element={<Signup />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
