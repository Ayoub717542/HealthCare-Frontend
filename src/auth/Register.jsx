
import { useState } from "react";
import api from "../service/api";
import { NavLink ,useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate(); 

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("");

    const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/login",{replace:true}); 
    } catch (error) {
      console.log(error); 
      console.log(error.message);
      console.log(error.response); 
    }
  };
    return(
       <>
       <div className="auth-container">

  <div className="auth-left">
    <h1>Create Account</h1>
    <p>Join HealthCare+ and start managing patients easily.</p>
    <p>
      Already have an account?
      <NavLink to="/login"> Login</NavLink>
    </p>
  </div>

  <div className="auth-card">

      <div>
        <form className="auth-form" onSubmit={handleRegister}>
                <label>Username</label>
            <input 
            type="text" 
            name="username"
            value={username}
            onChange={(e)=>{  setUsername(e.target.value)}}
            />
                <label>Email</label>
            <input 
            type="text" 
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            />
            <label>Password</label>
            <input 
            type="password" 
            name="password"
            value={password}
            onChange={(e)=>{setPassword( e.target.value)}} />
        <button type="submit">
            Register
        </button>
        </form>
       </div>


  </div>

</div>
       
       </> 
    )
}

export default Register