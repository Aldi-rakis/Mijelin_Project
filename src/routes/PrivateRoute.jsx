import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Check if user is authenticated - menggunakan token user
  const isUserAuthenticated = () => {
    const userToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    return !!userToken;
  };

  console.log("PrivateRoute: isUserAuthenticated =", isUserAuthenticated());
  
  // If not authenticated as user, redirect to user login
  return isUserAuthenticated() ? <Outlet /> : <Navigate to="/loginindex" replace />;
};

export default PrivateRoute;
