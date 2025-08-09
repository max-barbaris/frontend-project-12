import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header.jsx'
import LoginPage from './pages/Login.jsx'
import Signup from './pages/SignUp.jsx'
import MainPage from './pages/Main.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { resetRedirect } from './features/ui/uiSlice.jsx'
import { selectIsAuth, clearAuth } from './features/auth/authSlice'
import { PAGES } from './navigation/pageRoutes'
import { selectRedirectToLogin } from './features/ui/uiSelectors.jsx'
import { useEffect } from 'react'

const App = () => {
  const isAuth = useSelector(selectIsAuth)
  const redirectToLogin = useSelector(selectRedirectToLogin)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect (() => {
    if (redirectToLogin) {
      dispatch(clearAuth())
      dispatch(resetRedirect())
      navigate(PAGES.LOGIN)
    }
  }, [redirectToLogin, dispatch, navigate])

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
