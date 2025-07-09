import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const SignupShema = yup.object().shape({
  username: yup.string().required("requiredField"),
  password: yup.string().required("requiredField"),
});

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupShema,
    onSubmit: () => {},
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <form className="login-form col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">Войти</h1>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                name="username"
                placeholder="Ваш ник"
                autoComplete="username"
                required
              />
              <label htmlFor="username">Ваш ник</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                placeholder="Пароль"
                autoComplete="current-password"
                required
              />
              <label htmlFor="password">Пароль</label>
            </div>

            <button 
              type="submit" 
              className="w-100 mb-3 btn btn-outline-primary"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;