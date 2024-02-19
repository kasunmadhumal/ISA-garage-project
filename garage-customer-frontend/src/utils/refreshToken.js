import axios from "axios";
import env from "react-dotenv";
import  secureLocalStorage  from  "react-secure-storage";


export const refreshToken = async () => {

    const baseUrl = env.REACT_APP_API_BASE_URL;

    try {
      const token = secureLocalStorage.getItem("token");
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.post(`${baseUrl}/api/v1/auth/refresh-token`, {
      });
  
      if (response.status === 200) {
        const newToken = response.data.access_token;
        secureLocalStorage.setItem('token', newToken);
        return newToken;
      } else {
        console.error('Token refresh failed: from refresh token function');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }

    return null; 
  };
  