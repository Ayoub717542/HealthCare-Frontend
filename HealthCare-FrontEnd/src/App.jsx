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
import Login from "./views/Login";

function App() {
  const [open, setOpen] = useState(false);
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
      <div className="app">

        <Sidebar open={open} />

        <div className="content">

          <Header open={open} setOpen={setOpen} />

          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  handleLogin={handleLogin}
                  username={username}
                  password={password}
                  setUsername={setUsername}
                  setPassword={setPassword}
                />
              }
            />

            <Route path="/" element={<DashBoard fetchPatients={fetchPatients} />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/medicalrecords" element={<MedicalRecords />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </div>
      </div>

  );
}

export default App;