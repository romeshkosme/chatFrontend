import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function AuthLayout() {
    
  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthLayout;
