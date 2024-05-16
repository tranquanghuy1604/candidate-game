
import axios from "axios";
import { parseCookies } from 'nookies'; // Import parseCookies từ thư viện nookies
import cookie from 'js-cookie'


const axiosClient = axios.create({
    baseURL: 'https://api-pytalent.doratekjsc.com/api/v1',
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use((config) => {
  const token = cookie.get('access_token_hr');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// export const setToken = (token : any) => {
//   axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };


export default axiosClient;