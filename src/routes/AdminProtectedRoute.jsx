import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layoutadmin from '../layouts/Admin.jsx';

const AdminProtectedRoute = () => {
  // Check if admin is authenticated - menggunakan token admin yang terpisah
  const isAdminAuthenticated = () => {
    const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    return !!adminToken;
  };

  console.log("AdminProtectedRoute: isAdminAuthenticated =", isAdminAuthenticated());

  // If not authenticated as admin, redirect to admin login
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated as admin, render the admin layout with children
  return (
    // <Layoutadmin>
      <Outlet />
    // </Layoutadmin>
  );
};

export default AdminProtectedRoute;