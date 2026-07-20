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

});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) {
            console.log("Network error, server unreachable:", error.message);
            return Promise.reject(error);
        }
        
  const status = error.response.status;

        if (status === 400) {
            console.log("Bad request (400):", error.response.data);
        }
        else if (status === 401) {
            console.log("Unauthorized (401): removing session and redirecting");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        else if (status === 403) {
            console.log("Forbidden (403):", error.response.data);
        }
        else if (status === 404) {
            console.log("Not found (404):", error.response.data);
        }
        else if (status === 500) {
            console.log("Server error (500):", error.response.data);
        }
        else {
            console.log(`Unexpected error (${status}):`, error.response.data);
        }

        return Promise.reject(error);
    }
);

export default api;