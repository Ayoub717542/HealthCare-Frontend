import axios from "axios";
export const baseURL  = "http://localhost:8080/api"

export const api = axios.create({
  baseURL : baseURL
});

api.interceptors.request.use((config)=>{

    const token = localStorage.getItem("token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

},
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
    (response) => {
        console.log('Received Response:', response.status, response.config.url, response.data);
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status){
        case 401:
            console.error('Authorization Failed: Redirecting to login page...');
            localStorage.removeItem("token");
            window.location.href = "/login";
          break;
        case 404:
          console.error('Resource Not Found: The requested endpoint does not exist.');
          break;
        case 500:
          console.error('Server Error: Something went wrong on the server.');
          break;
        default:
          console.error(`Unhandled HTTP Error: Status ${error.response.status}`);
          break;
            }
        }else if (error.request){
             console.error('No response received from the server. Please check your network connection.');
        }else{
             console.error('Error setting up the request:', error.message);
        }

  return Promise.reject(error);
    }
);

export default api;