import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, Button, Card } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../features/auth/authApi'
import { selectError } from '../features/auth/authSlice'
import loginImg from '../assets/login.jpg'
import AuthForm from '../components/Auth/AuthForm'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().required('requiredField'),
  password: yup.string().required('requiredField'),
})

const LoginPage = () => {
  const authError = useSelector(selectError)
  const navigate = useNavigate()
  const loginRef = useRef(null)
  const [login] = useLogin()

  useEffect(() => {
    if (loginRef.current) {
      loginRef.current.focus()
    }
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setErrors({})
      await login(values).unwrap()
      navigate('/')
    },
  })

  const allErrors = {
    ...formik.errors,
    ...(authError && { password: authError }),
  }

  const footer = {
    text: 'Нет аккаунта?',
    action: 'Регистрация',
    href: '/signup',
  }

  return (
    <AuthForm footer={footer}>
      <Card.Body className="row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img
            className="rounded-circle"
            src={loginImg}
            alt="Войти"
          />
        </div>
        <Form className="login-form col-12 col-md-6 " onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">Войти</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="text"
              className="form-control"
              id="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              name="username"
              placeholder="Ваш ник"
              ref={loginRef}
              isInvalid={!!allErrors.username}
              autoComplete="username"
              required
            />
            <Form.Label htmlFor="username">Ваш ник</Form.Label>
            <Form.Control.Feedback type="invalid">
              {allErrors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="form-floating mb-4">
            <Form.Control
              type="password"
              className="form-control"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              placeholder="Пароль"
              autoComplete="current-password"
              isInvalid={!!allErrors.password}
              required
            />
            <Form.Label htmlFor="password">Пароль</Form.Label>
            <Form.Control.Feedback type="invalid">
              {allErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="w-100 mb-3" variant="outline-primary">
            Войти
          </Button>
        </Form>
      </Card.Body>
    </AuthForm>
  )
}

export default LoginPage
