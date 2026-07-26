import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../service/api";
import { NavLink ,useNavigate } from "react-router-dom";

function Login() {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const navigate = useNavigate(); 

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      navigate("/",{replace:true}); 
    } catch (error) {
      console.log(error); 
      console.log(error.message);
      console.log(error.response); 
    }
  };
    return (

        <div className="auth-container">

      <div className="auth-left">
        <h1>Welcome Back</h1>
        <p>
          Sign in to manage your patients, appointments,
          and medical records.
        </p>

        <p>
          Don't have an account? <NavLink to="/register">Create one</NavLink>
        </p>
      </div>

      <div className="auth-card">

        <h2>Login</h2>

        <form onSubmit={handleLogin} className="auth-form">

          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <div className="password-container">
          <label>Password</label>
          <input 
            type={showPassword ? "text" : "password"}
            placeholder="Password..."
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
            <button
          onClick={()=>setShowPassword(!showPassword)}
          >
            {showPassword ?<FaEyeSlash /> : <FaEye />}
          </button>
          </div>
         
          <button type="submit">
            Login
          </button>

          <p>
            Don't have an account?
            <NavLink to="/register"> Register</NavLink>
          </p>

        </form>

      </div>

</div>
    );
}
export default Login;