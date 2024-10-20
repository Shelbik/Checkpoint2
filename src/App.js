import React from 'react';
import './App.css';
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import Home from "./component/Home/Home";
import { Navbar } from "./component/Navbar/Navbar";
import RestaurantDetails from './component/Restaurant/RestaurantCardDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth } from './component/Auth/Auth';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Home />
        <RestaurantDetails />

        <Routes>
          <Route path="/account/register" element={<Auth />} />
          <Route path="/account/login" element={<Auth />} />
        </Routes>


        <Auth />
      </Router>
    </ThemeProvider>
  );
}

export default App;
