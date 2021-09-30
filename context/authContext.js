import React, { createContext, useState } from "react";

export const myAuthContext = createContext({});

function useAuthProvider() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("roles")
  const [isAuthenticated, setIsAuthenticated] = useState(() => (token ? true : false));
  const [isAdmin, setIsAdmin] = useState(() => (role === "admin" ? true : false));

  const login = async (accessToken, userID, userRoles) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("userID", userID);
    localStorage.setItem("roles", userRoles);
    const role = localStorage.getItem("roles");
    setIsAuthenticated(true);
    if (role !== null){
      if (role === "admin"){
        setIsAdmin(true)
      }
    } 
    console.log(role)
    console.log(isAdmin)
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("roles");
    setIsAuthenticated(false);
    setIsAdmin(false)
  };


  return {
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    login,
    logout,
  };
}

const AppContext = (props) => {
  const auth = useAuthProvider();

  return <myAuthContext.Provider value={auth}>{props.children}</myAuthContext.Provider>;
};

export default AppContext;
