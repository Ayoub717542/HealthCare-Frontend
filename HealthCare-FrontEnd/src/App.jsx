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

function App() {
  const [open, setOpen] = useState(false);

 return(
 <BrowserRouter>
 <Header open={open} setOpen={setOpen} />
<Sidebar open={open} />
<Routes>
  <Route path ="/" element={<Home></Home>} />
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
