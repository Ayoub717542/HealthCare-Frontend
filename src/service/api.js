import axios from "axios";

// Axios instence Configuration 
export const api = axios.create({
  baseURL : "http://localhost:8080/api"
});


// Axios interceptors Request Config to add access token to every Reaquest:
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token"); // to get access token from the LocalStorage that i have saved it earlier in the handleLogin
    if(token){// if the access token true it added to the Bearer token 
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
  (error) => {
    console.error("Request error ::", error);
    return Promise.reject(error);
  }
);

// response interceptor to handle errors runs whenever an Api receives a responce;


api.interceptors.response.use(
  //if the request is successfull
    (response) => {
        console.log('Received Response:', response.status, response.config.url, response.data);
        return response;
    },
    //if it fails
    (error) => {
        if (error.response) {
        //check the HTTP status weather its 401 or 404...
            switch (error.response.status){
        case 401:
            console.error('Authorization Failed...');
            localStorage.removeItem("token");
            window.location.replace("/login");
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