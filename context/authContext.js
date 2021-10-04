import React, { createContext, useState, useEffect } from "react";

import Cookies from "js-cookie";
import { useRouter } from 'next/router'

export const myAuthContext = createContext({});


function useAuthProvider() {
  const token = Cookies.get("token")
  const roles = Cookies.get("roles")
  const [isAuthenticated, setIsAuthenticated] = useState(() => token ? true : false);
  const [isAdmin, setIsAdmin] = useState(() => (roles === "admin") ? true : false);
  const router = useRouter()

  const login = async (accessToken, userID, userRoles) => {
    // localStorage.setItem("token", accessToken);
    // localStorage.setItem("userID", userID);
    // localStorage.setItem("roles", userRoles);
    // const role = localStorage.getItem("roles");
    // setIsAuthenticated(true);
    // if (role !== null){
    //   if (role === "admin"){
    //     setIsAdmin(true)
    //   }
    // } 
    // console.log(role)
    // console.log(isAdmin)
    Cookies.set("token", accessToken)
    Cookies.set("userID", userID)
    Cookies.set("roles", userRoles)

    if (userRoles === "admin"){
      setIsAdmin(true)
    }
    setIsAuthenticated(true)
  };

  const logout = async () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("userID");
    // localStorage.removeItem("roles");
    // setIsAuthenticated(false);
    // setIsAdmin(false)
    Cookies.remove("token")
    Cookies.remove("userID")
    Cookies.remove("roles")
    router.push("/login")
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
