import axios from "axios";
import cookie from 'js-cookie';


const axiosClientCandidate = axios.create({
    baseURL: 'https://api-pytalent.doratekjsc.com/api/v1/candidate',
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json',
    },
});

axiosClientCandidate.interceptors.request.use((config) => {
  const token = cookie.get('access_token_candidate');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default axiosClientCandidate;