import {Outlet, Navigate } from "react-router-dom";
function ProtectedRoute(){
    const username = localStorage.getItem("username");
    return username ? <Outlet /> : <Navigate to="/login" replace />
} 
export default ProtectedRoute
