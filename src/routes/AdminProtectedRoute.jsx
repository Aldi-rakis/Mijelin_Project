import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layoutadmin from '../layouts/Admin.jsx';

const AdminProtectedRoute = () => {
  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    return !!token;
  };

  // If not authenticated, redirect to admin login
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the admin layout with children
  return (
    <Layoutadmin>
      <Outlet />
    </Layoutadmin>
  );
};

export default AdminProtectedRoute;
