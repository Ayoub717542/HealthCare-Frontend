import {Outlet, useNavigate } from "react-router-dom";
function ProtectedRoute(){
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    return username ? <Outlet /> : navigate("/login",{replace:true})
} 
export default ProtectedRoute