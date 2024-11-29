import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  if(localStorage.getItem('role') == 'ADMIN'){
    return children
  }
  else if(localStorage.getItem('role') == 'MASTER_ADMIN'){
    return children
  }else{
    return <Navigate to="/" replace />
  }
  }