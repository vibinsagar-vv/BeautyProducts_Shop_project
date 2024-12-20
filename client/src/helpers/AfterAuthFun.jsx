import React from "react";
import { Navigate } from "react-router-dom";

export default function AfterAuthFun({ children }) {
    return (localStorage.getItem('forgot_verification')||localStorage.getItem('verification')) ? children : <Navigate to="/login" replace />;
  }