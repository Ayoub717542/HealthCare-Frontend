import { BrowserRouter, Route,Routes  } from "react-router-dom";
import { useState } from "react";
import Home from "./views/Home";
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
        username,
        password
    };
    try {
        const response = await api.post("/auth/login",user );
        localStorage.setItem("token",response.data.token );
        console.log("Login success");
    } catch(error) {
        console.log("Login failed");
    }
};

 return(
 <BrowserRouter>
 <Header open={open} setOpen={setOpen} />
<Sidebar open={open} />
<Routes>

<Route 
  path="/Login" 
  element={<Login 
              handleLogin={handleLogin}          
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              />} 
/>  <Route path ="/" element={<Home></Home>} />
  <Route path ="/DashBoard" element={<DashBoard></DashBoard>} />
  <Route path ="/Patients" element={<Patients></Patients>} />
  <Route path ="/Doctors" element={<Doctors></Doctors>} />
  <Route path ="/Appointments" element={<Appointments></Appointments>} />
  <Route path ="/MedicalRecords" element={<MedicalRecords></MedicalRecords>} />
  <Route path ="/About" element={<About></About>} />
  <Route path ="*" element={<NotFound></NotFound>} />
  </Routes> 
 </BrowserRouter>
 )
}

export default App
