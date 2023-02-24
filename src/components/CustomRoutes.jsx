import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import PageNotFound from "../pages/PageNotFound";
import PublicRoute from "../utils/PublicRoute";
import PrivateRoute from "../utils/PrivateRoute";
import { useAuth } from "../hooks/useAuth";

function CustomeRoutes() {
  const auth = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route element={<PublicRoute auth={auth} />}>
            <Route path="/" index element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          {/* PRIVATE ROUTE */}
          <Route element={<PrivateRoute auth={auth} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* INVALID */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default CustomeRoutes;
