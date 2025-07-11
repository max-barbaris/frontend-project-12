import React, { useRef, useEffect } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate  } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { request } from '../utils/request';

const initialValues = {
  username: "",
  password: ""
};

const authError = {
  username: " ",
  password: "Auth error"
};

const SignupShema = yup.object().shape({
  username: yup.string().required("requiredField"),
  password: yup.string().required("requiredField"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const loginRef =  useRef(null);

  useEffect(() => {
    if (loginRef.current) {
      loginRef.current.focus();
    }
  }, []);
  
  const formik = useFormik({
    initialValues,
    validationSchema: SignupShema,
    onSubmit: async (values, { setErrors }) => {
      setErrors({});
      const response = await request('api/v1/login', 'POST', values);

      if (response.isError) {
        setErrors(authError);
        return;
      }

      auth.logIn(response);
      navigate('/');
    },
  });

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
                isInvalid={!!formik.errors.username}
                autoComplete="username"
                required
              />
              <Form.Label htmlFor="username">Ваш ник</Form.Label>
              <Form.Control.Feedback type='invalid'>
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
                isInvalid={!!formik.errors.password}
                required
              />
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100 mb-3">
              Войти
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;