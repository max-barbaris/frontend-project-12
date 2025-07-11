import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login';
import MainPage from './components/Main';
import NotFoundPage from './components/NotFoundPage';
import { useAuth } from './context/AuthProvider';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <MainPage /> : <Navigate to="/login" replace />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;