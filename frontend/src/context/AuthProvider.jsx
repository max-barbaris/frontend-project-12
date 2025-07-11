import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { setAuth, getAuth, clearAuth } from "../utils/auth";

// Создаём "контекст" - специальное место для хранения данных, доступных всем компонентам
const AuthContext = createContext();

// Создаём компонент-поставщик данных (Provider)
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const currentUser = getAuth();
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    if (!user) {
      clearAuth();
    } else {
      setAuth(user);
    }
  }, [user]);

  const logIn = useCallback((data) => {
    setUser(data);
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
  }, [dispatch]);

  const contextValue = useMemo(() => ({
    user,
    logIn,
    logOut,
  }), [user, logIn, logOut]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
