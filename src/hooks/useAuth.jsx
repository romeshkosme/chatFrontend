import React, { useState, useEffect, useContext, createContext } from "react";
import { login, register } from "../api/auth.api";
import jwt_decode from "jwt-decode";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded) setUser(decoded);
    }
  }, []);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (payload) => {
    return login(payload).then((response) => {
      localStorage.setItem("token", response.token);
      setUser(response.user);
      return response.user;
    });
  };
  const signup = async (payload) => {
    return register(payload).then((response) => {
      localStorage.setItem("token", response.token);
      setUser(response.user);
      return response.user;
    });
  };
  const signout = () => {
    localStorage.removeItem("token");
    setUser(false);
  };

  useEffect(() => {
    // Cleanup subscription on unmount
    // return () => unsubscribe();
  }, []);
  return {
    user,
    signin,
    signup,
    signout,
  };
}
