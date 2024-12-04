import React from "react";
import ProfileNavigation from "./ProfileNavigation.jsx";
import UserProfile from "./UserProfile.jsx";
import Orders from "./Orders.jsx";
import Address from "./Address.jsx";
import Favorites from "./Favorites.jsx";
import Events from "./Events.jsx";
import AccountSettings from "./AccountSettings.jsx";
import { Routes, Route } from "react-router-dom";

const Profile = ({ openSideBar, setOpenSideBar }) => {
    const handleMenuToggle = () => {
        setOpenSideBar(prevState => !prevState);  // Переключаем состояние (если открыто - закроем, если закрыто - откроем)
      };
      

  return (
    <div className="flex">
    
      <ProfileNavigation 
        open={openSideBar} 
        handleClose={handleMenuToggle}  
      />

      
      <div className="flex-grow p-4 lg:w-[80%]">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Address />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/events" element={<Events />} />
          <Route path="/settings" element={<AccountSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
