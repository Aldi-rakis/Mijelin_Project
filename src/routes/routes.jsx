//import react router dom
import { Routes, Route } from "react-router-dom";

//=======================================================================
//ADMIN
//=======================================================================

//import view Login
import Login from '../pages/admin/Login.jsx';

//import view Home
import Home from '../pages/Web/Home/Index.jsx';


//import view Home
import Riwayat from '../pages/Web/Riwayat/Index.jsx';


function RoutesIndex() {
    return (
        <Routes>

             {/* route "Homepage" */}
             <Route path="/" element={<Home />} />

             
             {/* route "Homepage" */}
             <Route path="/riwayat" element={<Riwayat />} />


            {/* route "/admin/login" */}
            <Route path="/admin/login" element={<Login />} />

        </Routes>
    )
}

export default RoutesIndex