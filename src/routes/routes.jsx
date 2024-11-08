//import react router dom
import { Routes, Route } from "react-router-dom";

//=======================================================================
//ADMIN
//=======================================================================

//import view Login


//import view Home
import Home from '../pages/Web/Home/Index.jsx';


//import view Home
import Riwayat from '../pages/Web/Riwayat/Index.jsx';

//import view Home
import Tukar from '../pages/Web/Tukar/Index.jsx';

//import view Home
import Detailtukar from '../pages/Web/Tukar/Detail.jsx';


//import view Profile
import Profle from '../pages/Web/Profile/Index.jsx';


//import view Profile
import Datadiri from '../pages/Web/Profile/Datadiri.jsx';


//import view Profile
import Alamat from '../pages/Web/Profile/Alamat.jsx';

import Jemput from '../pages/Web/Jemput/Index.jsx';
import Berita from '../pages/Web/Edukasi/Index.jsx'; 

import Loginindex from '../pages/Web/Login/Index.jsx';
import Login from '../pages/Web/Login/login.jsx';
import Register from "../pages/Web/Login/Register.jsx";
import PrivateRoute from '../routes/PrivateRoute.jsx';


function RoutesIndex() {
    return (
        <Routes>


        {/* Halaman Register dan Login dapat diakses siapa saja */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginindex" element={<Loginindex />} />
        
           {/* route "Riwayat" */}
           <Route path="/berita" element={<Berita />} />


        {/* Halaman yang dilindungi oleh PrivateRoute */}
                    {/* route "Homepage" */}
                    <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    </Route>


                    

           

             
         
         
           


            {/* route "Riwayat" */}
            <Route path="/riwayat" element={<Riwayat />} />

            
            {/* route "Riwayat" */}
            <Route path="/jemput" element={<Jemput />} />



            {/* route "Tukar" */}
            <Route path="/tukar" element={<Tukar />} />

                    {/* route "Tukar" */}
                    <Route path="/tukar/detail" element={<Detailtukar />} />



            {/* route "Profile" */}
            <Route path="/profile" element={<Profle />} />

                    {/* route "datadiri" */}
                    <Route path="/profile/datadiri/:nik" element={<Datadiri />} />

                    {/* route "Alamat" */}
                    <Route path="/profile/alamat/:nik" element={<Alamat />} />


            {/* route "/admin/login" */}
            <Route path="/admin/login" element={<Alamat />} />


            
         

        </Routes>
    )
}

export default RoutesIndex