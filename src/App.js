import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentification/Action';
import { CustomerRoute } from "./Routers/CustomerRoute";
import Navbar from './component/Navbar/Navbar';

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt || auth.jwt) {
      dispatch(getUser(jwt || auth.jwt))
        .catch(err => {
          console.error('Failed to fetch user data', err);
        });
    }
  }, [jwt, auth.jwt, dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CustomerRoute />
    </ThemeProvider>
  );
}

export default App;
