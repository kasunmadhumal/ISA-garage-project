import axios from 'axios';
import env from "react-dotenv";
import  secureLocalStorage  from  "react-secure-storage"
import { refreshToken } from './refreshToken';



const api = axios.create({
  baseURL: env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = secureLocalStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error in interceptor:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        if (await newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          console.error('Token refresh failed');
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
