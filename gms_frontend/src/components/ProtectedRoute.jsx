import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if (!token || !userString) {
    return <Navigate to="/signin" replace />;
  }

  try {
    const user = JSON.parse(userString);
    const userRole = user.role ? user.role.toUpperCase() : '';
    
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // User is authenticated but doesn't have the required role
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    return <Navigate to="/signin" replace />;
  }

  return children;
}
