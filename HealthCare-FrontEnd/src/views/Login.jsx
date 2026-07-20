import { useState } from "react";
import api from "../service/api";
import { NavLink ,useNavigate } from "react-router-dom";

function Login() {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate(); 

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/"); 
    } catch (error) {
      console.log(error); 
      console.log(error.message);
      console.log(error.response); 
    }
  };
    return (

        <form onSubmit={handleLogin} className="loginForm">
            <label>Username</label>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />
            <label>Password</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <div>
            <button type="submit">
                Login
            </button>
            <NavLink to="/register">Register</NavLink>
            </div>
            
        </form>
    );
}


export default Login;