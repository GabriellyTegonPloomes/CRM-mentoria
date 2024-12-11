import axios from "axios";

export const useAxios = () => {
  const api = axios.create({
    baseURL: "https://api2-s05-app.ploomes.com",
    headers: {
      Accept: "application/json",
    },
  });

  api.interceptors.request.use((config) => {
    if (localStorage.getItem("UK")) {
      config.headers["user-key"] = localStorage.getItem("UK");
    }
    return config;
  });

  api.interceptors.response.use(undefined, (error) => {
    switch (error.response.status) {
      case 401:
        window.location.href = "/";
        break;
      default:
        return Promise.reject(error);
    }
  });

  return api;
};
