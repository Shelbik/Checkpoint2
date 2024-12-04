import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Drawer, Divider, useMediaQuery, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Authentification/Action";

const adminMenu = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "dashboard" },
  { title: "Restaurants", icon: <RestaurantMenuIcon />, path: "restaurants" },
  { title: "Users", icon: <PeopleIcon />, path: "users" },
  { title: "Logout", icon: <ExitToAppIcon />, path: "" },
];

const AdminNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width: 900px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/gigadmin/${item.path}`);
    }
    handleClose();
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"} 
      onClose={handleClose}
      open={isSmallScreen ? open : true} 
      anchor="left"
      sx={{ zIndex: 1, position: "sticky" }}
    >
      <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl pt-16 gap-7">
        {adminMenu.map((item, i) => (
          <React.Fragment key={i}>
            <div
              onClick={() => handleNavigate(item)}  
              className="px-5 flex items-center space-x-5 cursor-pointer"
            >
              {item.icon}
              <span>{item.title}</span>
            </div>

           
            {i !== adminMenu.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </Drawer>
  );
};


export default AdminNavigation;
