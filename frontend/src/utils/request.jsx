import axios from "axios";

export const request = (url, method, data) => {
  const config = {
    method,
    url,
    data,
  };

  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        isError: true,
        code: error.response?.status || 500, // 500 - Ошибка сервера.
        message: error.message || "unknown error",
      };
    });
};