import React from "react";
import AdminNavigation from "./AdminNavigation";
import AdminProfile from "./AdminProfile";

import { Routes, Route } from "react-router-dom";
import AdminUsers from "./AdminUsers";


const GigaAdmin = ({ openSideBar, setOpenSideBar }) => {
  const handleMenuToggle = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <div className="flex">
      <AdminNavigation open={openSideBar} handleClose={handleMenuToggle} />
      <div className="flex-grow p-4 lg:w-[80%]">
        <Routes>
          <Route path="/" element={<AdminProfile />} />
          <Route path="/users" element={<AdminUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default GigaAdmin;
