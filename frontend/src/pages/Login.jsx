import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, Button, Card } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useLogin } from '../features/auth/authApi'
import { selectAuthError, selectIsAuthError } from '../features/auth/authSlice'
import {
  loginInitialValues as initialValues,
  FIELD_USERNAME,
  FIELD_PASSWORD,
} from '../features/auth/constants'
import { loginValidationSchema as validationSchema } from '../features/auth/validation'

import AuthForm from '../components/Auth/AuthForm'
import loginImg from '../assets/login.jpg'

import { PAGES } from '../navigation/routes'

const LoginPage = () => {
  const { t } = useTranslation()
  const authError = useSelector(selectAuthError)
  const isAuthError = useSelector(selectIsAuthError)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [login, { isLoading }] = useLogin()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data, { setErrors }) => {
      setErrors({})
      await login(data).unwrap()
      navigate(PAGES.MAIN)
    },
  })

  const allErrors = {
    ...formik.errors,
    ...(isAuthError && { [FIELD_PASSWORD]: authError }),
  }

  const footer = {
    text: t('auth.loginForm.dontHaveAccount'),
    action: t('auth.signupForm.registration'),
    href: PAGES.SIGNUP,
  }

  return (
    <AuthForm footer={footer}>
      <Card.Body className="row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img
            className="rounded-circle"
            src={loginImg}
            alt={t('auth.loginForm.login')}
          />
        </div>
        <Form className="login-form col-12 col-md-6 " onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">{t('auth.loginForm.login')}</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              type="text"
              className="form-control"
              id={FIELD_USERNAME}
              onChange={formik.handleChange}
              value={formik.values[FIELD_USERNAME]}
              name={FIELD_USERNAME}
              placeholder={t('auth.loginForm.yourNickname')}
              ref={inputRef}
              isInvalid={!!allErrors[FIELD_USERNAME] || isAuthError}
              autoComplete="username"
              required
            />
            <Form.Label htmlFor={FIELD_USERNAME}>{t('auth.loginForm.yourNickname')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(`auth.loginForm.error.${allErrors[FIELD_USERNAME]}`)}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="form-floating mb-4">
            <Form.Control
              type="password"
              className="form-control"
              id={FIELD_PASSWORD}
              onChange={formik.handleChange}
              value={formik.values[FIELD_PASSWORD]}
              name={FIELD_PASSWORD}
              placeholder={t('auth.loginForm.password')}
              autoComplete="current-password"
              isInvalid={!!allErrors[FIELD_PASSWORD] || isAuthError}
              required
            />
            <Form.Label htmlFor={FIELD_PASSWORD}>{t('auth.loginForm.password')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(`auth.loginForm.error.${allErrors[FIELD_PASSWORD]}`)}
            </Form.Control.Feedback>
          </Form.Group>

          <Button disabled={isLoading} type="submit" className="w-100 mb-3" variant="outline-primary">
            {t('auth.loginForm.login')}
          </Button>
        </Form>
      </Card.Body>
    </AuthForm>
  )
}

export default LoginPage
