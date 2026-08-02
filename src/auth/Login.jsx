import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../service/api";
import { NavLink ,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
      
        const [showPassword, setShowPassword] = useState(false);
        const navigate = useNavigate(); 

         //register an input field into React Hook Form 
        const {register,handleSubmit,formState:{ errors }} = useForm();

    const handleLogin = async (data) => {
    try {
      const response = await api.post("/auth/login", {
        username:data.username,
        password:data.password,
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
        <form onSubmit={handleSubmit(handleLogin)} className="auth-form">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            {...register("username", {
              required:"username is Required!"
            })}
          />
          {errors.username &&(<p className="error-text">{errors.username.message}</p>)}
        
          <div className="password-container">
          <label>Password</label>
          <input 
            {...register("password" , {
              required:"password is required",
              minLength:{
                value:6,
                message:"password must be at least 6 characters"
              }
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password..."
          />
            <button
          type="button"
          onClick={()=>setShowPassword(!showPassword)}
          >
            {showPassword ?<FaEyeSlash /> : <FaEye />}
          </button>
          </div>
           {errors.password && (<p className="error-text">{errors.password.message}</p>)}
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