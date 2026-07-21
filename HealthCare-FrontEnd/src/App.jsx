import { Route, Routes,useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import DashBoard from "./views/DashBoard";
import Patients from "./views/Patients";
import Doctors from "./views/Doctors";
import Appointments from "./views/Appointments";
import MedicalRecords from "./views/MedicalRecords";
import About from "./views/About";
import NotFound from "./views/NotFound";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import api from "./service/api";
import Login from "./auth/Login";
import Register from "./auth/Register"
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if(token && username){
      api.get(`/auth/userByName?username=${username}`)
      .then((rs)=>{
        setUser(rs.data);
      })
      .catch((error)=>{
        console.log(error);
        localStorage.removeItem("token");
      })
    }
  },[]);


  return (
      <div className="app">
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route  element={<ProtectedRoute />}>

                          <Route
                    element={
                      <Layout
                        open={open}
                        setOpen={setOpen}
                        user={user}
                      />
                    }
                  >

                <Route index element={<DashBoard />} />
                <Route path="patients" element={<Patients />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="medicalrecords" element={<MedicalRecords />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            
</Route>
        </Routes>

        </div>
      </div>

  );
}

export default App;