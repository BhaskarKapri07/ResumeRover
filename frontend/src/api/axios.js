import axios from "axios";

// Create an instance of axios
const customAxios = axios.create({
  baseURL: "https://resumerover.onrender.com/api", // Your API base URL
});

// Set up an interceptor to include the token in the headers of all requests
customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
