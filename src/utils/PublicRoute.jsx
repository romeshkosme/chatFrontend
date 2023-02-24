import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ auth, redirectPath = "/dashboard", children }) => {
  if (auth && auth.user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;
