import React from 'react';
import { Navigate } from 'react-router-dom';
import { getValidAuth } from '../utils/auth.js';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isLogged, user } = getValidAuth();

  if (!isLogged || !user) {
    return <Navigate to="/signin" replace />;
  }

  const userRole = user.role ? user.role.toUpperCase() : '';
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // User is authenticated but doesn't have the required role
    return <Navigate to="/" replace />;
  }

  return children;
}
