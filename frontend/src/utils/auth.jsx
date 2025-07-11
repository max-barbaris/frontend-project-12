export const setAuth = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getAuth = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem("user");
};