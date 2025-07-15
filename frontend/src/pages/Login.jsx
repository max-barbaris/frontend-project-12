import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../features/auth/authApi'
import { selectError, selectIsError } from '../features/auth/authSlice'

const initialValues = {
  username: '',
  password: '',
}

const SignupShema = yup.object().shape({
  username: yup.string().required('requiredField'),
  password: yup.string().required('requiredField'),
})

const LoginPage = () => {
  const authError = useSelector(selectError)
  const isAuthError = useSelector(selectIsError)
  const navigate = useNavigate()
  const loginRef = useRef(null)
  const [login] = useLoginMutation()

  useEffect(() => {
    if (loginRef.current) {
      loginRef.current.focus()
    }
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema: SignupShema,
    onSubmit: async (values, { setErrors }) => {
      setErrors({})
      await login(values).unwrap()
      navigate('/')
    },
  })

  return (
    <Container className="container-fluid h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Form className="login-form col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
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
                isInvalid={!!formik.errors.username || isAuthError}
                autoComplete="username"
                required
              />
              <Form.Label htmlFor="username">Ваш ник</Form.Label>
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form-floating mb-3">
              <Form.Control
                type="password"
                className="form-control"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                placeholder="Пароль"
                autoComplete="current-password"
                isInvalid={!!formik.errors.password || isAuthError}
                required
              />
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control.Feedback type="invalid">
                {formik.errors.password || authError}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100 mb-3" variant="outline-primary">
              Войти
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
