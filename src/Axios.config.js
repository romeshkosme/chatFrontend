import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add a request interceptor
Axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    config.headers.authorization = token ? `Bearer ${token}` : ''
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
Axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default Axios;