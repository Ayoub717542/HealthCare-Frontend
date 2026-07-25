import { useState } from "react";
import api from "../service/api";
function Login(
    {
        handleLogin ,
        username,
        password,
        setUsername,
        setPassword,}) {
    return (
        <form onSubmit={handleLogin}>

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

            <button type="submit">
                Login
            </button>

        </form>
    );
}


export default Login;