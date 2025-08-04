import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, Button, Spinner, Card } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useSignup } from '../../features/auth/authApi'
import { selectError } from '../../features/auth/authSlice'
import signupImg from '../../assets/signup.jpg'
import AuthForm from './AuthForm'
import * as yup from 'yup'

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
}

const Signup = () => {
  const authError = useSelector(selectError)
  const navigate = useNavigate()
  const [signup, { isLoading }] = useSignup()
  const inputRef = useRef(null)

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('requiredField')
      .min(3, 'usernameLength')
      .max(20, 'usernameLength'),
    password: yup
      .string()
      .trim()
      .required('requiredField')
      .min(6, 'passwordLength'),
    confirmPassword: yup
      .string()
      .required('requiredField')
      .oneOf([yup.ref('password'), null], 'passwordsMustMatch'),
  })

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setErrors({})
      await signup(values).unwrap()
      navigate('/')
    },
  })

  const allErrors = {
    ...errors,
    confirmPassword: errors.confirmPassword || authError,
  }

  return (
    <AuthForm>
      <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <img
            className="rounded-circle"
            src={signupImg}
            alt="Регистрация"
          />
        </div>
        <Form className="w-50" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">Регистрация</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              className="form-control"
              name="username"
              id="username"
              onChange={handleChange}
              value={values.username}
              autoComplete="username"
              placeholder="Ваш ник"
              ref={inputRef}
              isInvalid={!!allErrors.username}
            />
            <Form.Label htmlFor="username">Ваш ник</Form.Label>
            <Form.Control.Feedback type="invalid">
              {allErrors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              className="form-control"
              name="password"
              id="password"
              type="password"
              onChange={handleChange}
              value={values.password}
              autoComplete="current-pasword"
              placeholder="Пароль"
              isInvalid={!!allErrors.password}
            />
            <Form.Label htmlFor="password">Пароль</Form.Label>
            <Form.Control.Feedback type="invalid">
              {allErrors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              className="form-control"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              onChange={handleChange}
              value={values.confirmPassword}
              autoComplete="current-password"
              placeholder="Пароль"
              isInvalid={!!allErrors.confirmPassword}
            />
            <Form.Label htmlFor="confirmPassword">Пароль</Form.Label>
            <Form.Control.Feedback type="invalid">
              {allErrors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            className="w-100"
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            variant="outline-primary"
          >
            Зарегестрироваться
            {isLoading && (
              <div className="position-absolute d-inline-block right-1 end-0 pe-3">
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </div>
            )}
          </Button>
        </Form>
      </Card.Body>
    </AuthForm>
  )
}

export default Signup
