//import react router dom
import { Routes, Route, Navigate } from "react-router-dom";

//=======================================================================
//WEB/USER PAGES
//=======================================================================

//import view Home
import Home from '../pages/Web/Home/Index.jsx';

//import view Riwayat
import Riwayat from '../pages/Web/Riwayat/Index.jsx';

//import view Tukar
import Tukar from '../pages/Web/Tukar/Index.jsx';

//import view Tukar Detail
import Detailtukar from '../pages/Web/Tukar/Detail.jsx';

//import view Profile
import Profle from '../pages/Web/Profile/Index.jsx';

//import view Profile Data Diri
import Datadiri from '../pages/Web/Profile/Datadiri.jsx';

//import view Profile Alamat
import Alamat from '../pages/Web/Profile/Alamat.jsx';

//import view Jemput
import Jemput from '../pages/Web/Jemput/Index.jsx';

//import view Berita/Edukasi
import Berita from '../pages/Web/Edukasi/Index.jsx';
import Beritadetail from '../pages/Web/Edukasi/Detail.jsx';

//import view Login & Register
import Loginindex from '../pages/Web/Login/Index.jsx';
import Login from "../pages/Web/Login/Login.jsx";
import Register from "../pages/Web/Login/Register.jsx";

//import view Voucher
import Voucher from "../pages/Web/Tukar/Voucher.jsx";

//import components
import LoadingLottie2 from "../components/loadingLottie.jsx";

//=======================================================================
//ADMIN PAGES
//=======================================================================

//import Admin Login
import Adminlogin from "../pages/Admin/Login.jsx";

//import Admin Dashboard
import Dashboard from "../pages/Admin/DashboardOverview.jsx";

//import Admin Berita
import BeritaCreate from "../pages/Admin/berita/Create.jsx";
import BeritaIndex from "../pages/Admin/berita/Berita.jsx";


//import Admin Users
import Usernew from "../pages/Admin/UsersNew.jsx";

//import Admin Pickup
import PickupIndex from "../pages/Admin/Pickup/Index.jsx";

//=======================================================================
//ROUTE PROTECTION
//=======================================================================

//import Protected Routes
import PrivateRoute from '../routes/PrivateRoute.jsx';
import AdminProtectedRoute from "./AdminProtectedRoute.jsx";


function RoutesIndex() {
  return (
    <Routes>
      {/* =======================================================================
          PUBLIC ROUTES - Dapat diakses tanpa login
          ======================================================================= */}
      
      {/* User Authentication Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loginindex" element={<Loginindex />} />
      
      {/* Admin Authentication Route - Tidak memerlukan AdminProtectedRoute */}
      <Route path="/admin/login" element={<Adminlogin />} />
      
      {/* Admin Root Redirect */}
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

      {/* =======================================================================
          USER ROUTES - Dilindungi oleh PrivateRoute (User Authentication)
          ======================================================================= */}
      
      <Route element={<PrivateRoute />}>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Berita/Edukasi Routes */}
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<Beritadetail />} />

        {/* Riwayat Routes */}
        <Route path="/riwayat" element={<Riwayat />} />

        {/* Jemput Routes */}
        <Route path="/jemput" element={<Jemput />} />

        {/* Tukar/Reward Routes */}
        <Route path="/tukar" element={<Tukar />} />
        <Route path="/tukar/:id" element={<Detailtukar />} />
        <Route path="/voucher" element={<Voucher />} />

        {/* Profile Routes */}
        <Route path="/profile" element={<Profle />} />
        <Route path="/profile/datadiri/:nik" element={<Datadiri />} />
        <Route path="/profile/alamat/:nik" element={<Alamat />} />

        {/* Utility Routes */}
        <Route path="/lottie" element={<LoadingLottie2 />} />
      </Route>

      {/* =======================================================================
          ADMIN ROUTES - Dilindungi oleh AdminProtectedRoute (Admin Authentication)
          ======================================================================= */}
      
      <Route element={<AdminProtectedRoute />}>
        {/* Admin Dashboard - Default admin page */}
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* Admin Berita Management */}
        <Route path="/admin/berita" element={<BeritaIndex />} />
        <Route path="/admin/berita/create" element={<BeritaCreate />} />

        {/* Admin Users Management */}
        <Route path="/admin/users" element={<Usernew />} />

        {/* Admin Pickup Management */}
        <Route path="/admin/pickup" element={<PickupIndex />} />
      </Route>

      {/* =======================================================================
          404 & CATCH ALL ROUTES
          ======================================================================= */}
      
      {/* Redirect untuk route yang tidak ditemukan */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default RoutesIndex