import { Routes, Route } from 'react-router-dom';
import Navbar from "../component/Navbar/Navbar";
import Home from "../component/Home/Home";
import RestaurantCardDetails from "../component/Restaurant/RestaurantCardDetails";
import Cart from "../component/Cart/Cart";
import Profile from "../component/Profile/Profile";
import { Auth } from "../component/Auth/Auth";
import { useState } from 'react';
import GigaAdmin from "../component/Profile/GigaAdmin/GigaAdmin"

export const CustomerRoute = () => {
    const [openSideBar, setOpenSideBar] = useState(false); // Управление состоянием бокового меню

    return (
        <div>
            
            <Navbar onMenuClick={() => setOpenSideBar(prevState => !prevState)} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account/:register" element={<Auth />} />
                <Route path="/account/login" element={<Auth />} />
                <Route path="/restaurant/:city/:title/:id" element={<RestaurantCardDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route 
                    path="/my-profile/*" 
                    element={<Profile openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />} 
                />
                <Route 
                    path="/gigadmin/*" 
                    element={<GigaAdmin openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />} 
                />
            </Routes>
        </div>
    );
};
