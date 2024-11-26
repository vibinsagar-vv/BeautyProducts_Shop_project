import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    return localStorage.getItem('role') == 'ADMIN' ? children : <Navigate to="/" replace />;
  }