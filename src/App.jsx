import React, { useState, useEffect } from "react"
import { conf } from "./config/conf"
import authservice from "./appwrite/auth";
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from "./store/authSlice";
import Header from "./components/header/Header";
import Fotter from "./components/fotter/Fotter";
import { Outlet } from "react-router-dom";


function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {

    authservice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout());
        }
      }).catch(() => dispatch(logout()))
      .finally(() => setloading(false));
    }, []);


   

  return (
    <>
      <Header />
      <Outlet />
      <Fotter />
    </>
  )
}

export default App
