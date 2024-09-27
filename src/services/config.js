import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000" });

api.interceptors.response.use(
  (response) => response.data,
  (error) => promise.reject(error)
);

export default api;
