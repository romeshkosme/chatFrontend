import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ auth, redirectPath = "/", children }) => {
  if (!auth || !auth.user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
