import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Cek apakah token tersedia di localStorage sebagai tanda bahwa pengguna telah login
  const auth = localStorage.getItem('token');
  
  return auth ? <Outlet /> : <Navigate to="/loginindex" />;
};

export default PrivateRoute;
