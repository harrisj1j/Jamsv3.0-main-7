
import {Outlet, Navigate } from "react-router-dom";
import React from 'react';
import Login from "./Login";

const useAuth = () => {
    const user = {loggedIn: false}
    return user && user.loggedIn;
}

const ProtectedRoutes = () => {
   let auth = {'token':false}
   return (
        auth.token ? <Outlet /> : <Navigate to="/"/>
   )
        
};

export default ProtectedRoutes;
