import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, Card } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import signupImg from '../assets/signup.jpg'

import AuthForm from '../components/Auth/AuthForm'
import LoadingButton from '../components/Button/LoadingButton'

import { useSignup } from '../features/auth/authApi'
import { selectAuthError, selectIsAuthError } from '../features/auth/authSlice'
import {
  signupInitialValues as initialValues,
  FIELD_USERNAME,
  FIELD_PASSWORD,
  FIELD_CONFIRM_PASSWORD,
} from '../features/auth/constants'
import { signupValidationSchema as validationSchema } from '../features/auth/validation'

import { PAGES } from '../navigation/pageRoutes'

const Signup = () => {
  const { t } = useTranslation()
  const authError = useSelector(selectAuthError)
  const isAuthError = useSelector(selectIsAuthError)
  const navigate = useNavigate()
  const [signup, { isLoading }] = useSignup()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setErrors({})
      await signup(values).unwrap()
      navigate(PAGES.MAIN)
    },
  })

  const allErrors = {
    ...formik.errors,
    ...(isAuthError && { [FIELD_CONFIRM_PASSWORD]: authError }),
  }

  return (
    <AuthForm>
      <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <img
            className="rounded-circle"
            src={signupImg}
            alt={t('auth.signupForm.registration')}
          />
        </div>
        <Form className="w-50" onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">{t('auth.signupForm.registration')}</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              className="form-control"
              name={FIELD_USERNAME}
              id={FIELD_USERNAME}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[FIELD_USERNAME]}
              placeholder={t('auth.signupForm.yourNickname')}
              ref={inputRef}
              isInvalid={!!(formik.touched[FIELD_USERNAME] && allErrors[FIELD_USERNAME])}
              autoComplete="off"
            />
            <Form.Label htmlFor={FIELD_USERNAME}>
              {t('auth.signupForm.yourNickname')}
            </Form.Label>
            {formik.touched[FIELD_USERNAME] && allErrors[FIELD_USERNAME] && (
              <div className="invalid-tooltip d-block">
                {t(`auth.signupForm.error.${allErrors[FIELD_USERNAME]}`)}
              </div>
            )}
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              className="form-control"
              name={FIELD_PASSWORD}
              id={FIELD_PASSWORD}
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[FIELD_PASSWORD]}
              placeholder={t('auth.signupForm.password')}
              isInvalid={!!(formik.touched[FIELD_PASSWORD] && allErrors[FIELD_PASSWORD])}
              autoComplete="off"
            />
            <Form.Label htmlFor={FIELD_PASSWORD}>
              {t('auth.signupForm.password')}
            </Form.Label>
            {formik.touched[FIELD_PASSWORD] && allErrors[FIELD_PASSWORD] && (
              <div className="invalid-tooltip d-block">
                {t(`auth.signupForm.error.${allErrors[FIELD_PASSWORD]}`)}
              </div>
            )}
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              className="form-control"
              name={FIELD_CONFIRM_PASSWORD}
              id={FIELD_CONFIRM_PASSWORD}
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[FIELD_CONFIRM_PASSWORD]}
              placeholder={t('auth.signupForm.confirmPassword')}
              isInvalid={
                (formik.touched[FIELD_CONFIRM_PASSWORD]
                  && allErrors[FIELD_CONFIRM_PASSWORD])
              }
              autoComplete="off"
            />
            <Form.Label htmlFor={FIELD_CONFIRM_PASSWORD}>
              {t('auth.signupForm.confirmPassword')}
            </Form.Label>
            {formik.touched[FIELD_CONFIRM_PASSWORD]
              && allErrors[FIELD_CONFIRM_PASSWORD]
              && (
                <div className="invalid-tooltip d-block">
                  {t(`auth.signupForm.error.${allErrors[FIELD_CONFIRM_PASSWORD]}`)}
                </div>
              )}
          </Form.Group>
          <LoadingButton
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            className="w-100"
            variant="outline-primary"
          >
            {t('auth.signupForm.register')}
          </LoadingButton>
        </Form>
      </Card.Body>
    </AuthForm>
  )
}

export default Signup
