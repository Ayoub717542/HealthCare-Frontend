import { Navigate,Outlet } from "react-router-dom";
function ProtectedRoute(){
    const username = localStorage.getItem("username");
    return username ? <Outlet /> : <Navigate to="/login" />
} 
export default ProtectedRoute