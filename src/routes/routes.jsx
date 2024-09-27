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

//import view Home
import Tukar from '../pages/Web/Tukar/Index.jsx';

//import view Profile
import Profle from '../pages/Web/Profile/Index.jsx';


//import view Profile
import Datadiri from '../pages/Web/Profile/Datadiri.jsx';


function RoutesIndex() {
    return (
        <Routes>

             {/* route "Homepage" */}
             <Route path="/" element={<Home />} />

             
             {/* route "Riwayat" */}
             <Route path="/riwayat" element={<Riwayat />} />

             {/* route "Tukar" */}
             <Route path="/tukar" element={<Tukar />} />

               {/* route "Profile" */}
               <Route path="/profile" element={<Profle />} />

                {/* route "Profile" */}
                <Route path="/profile/datadiri" element={<Datadiri />} />


            {/* route "/admin/login" */}
            <Route path="/admin/login" element={<Login />} />

        </Routes>
    )
}

export default RoutesIndex