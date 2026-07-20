import { Route, Routes,useNavigate  } from "react-router-dom";
import { useState } from "react";
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
import Register from "./views/Register"
function App() {
  const [open, setOpen] = useState(false);



  return (
      <div className="app">

        <Sidebar open={open} />

        <div className="content">

          <Header open={open} setOpen={setOpen} />

          <Routes>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login"element={<Login/>} />
            <Route path="/" element={<DashBoard />} />
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