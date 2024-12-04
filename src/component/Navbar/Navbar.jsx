import { Avatar, Badge, IconButton, Box } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Иконка меню

export const Navbar = ({ onMenuClick }) => {
  const { auth } = useSelector((store) => store); // Получаем данные пользователя из Redux
  const navigate = useNavigate();

  // Проверяем размер экрана для отображения иконки меню на маленьких экранах
  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  // Функция для перехода на страницу профиля в зависимости от роли пользователя
  const handleAvatarClick = () => {
    if (auth?.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/gigadmin");
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 2, lg: 5 },
        py: "0.8rem",
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "#e91e63",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Логотип и название */}
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={() => navigate("/")}
          className="logo font-semibold text-gray-300 text-2xl"
        >
          Martiniuc food
        </li>
      </div>

      {/* Основная часть с кнопками */}
      <div className="flex items-center space-x-2 lg:space-x-10">
        {/* Кнопка поиска */}
        <div>
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>

        {/* Кнопка аккаунта/аватара */}
        <div>
          {auth?.user ? (
            <Avatar
              onClick={handleAvatarClick}
              sx={{ bgcolor: "white", color: pink.A400 }}
            >
              {auth?.user?.fullname
                ? auth.user.fullname[0].toUpperCase()
                : "U"}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>

        {/* Кнопка корзины */}
        <div>
          <IconButton>
            <Badge color="primary" badgeContent={3}>
              <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>

        {/* Показать кнопку "Menu" только на маленьких экранах */}
        {isSmallScreen && (
          <div className="lg:hidden">
            <IconButton
              className="p-2 bg-white text-pink-500 rounded-md shadow-md"
              onClick={onMenuClick} // Вызов функции при клике
            >
              <MenuIcon sx={{ fontSize: "1.5rem"  }} />
            </IconButton>
          </div>
        )}
      </div>
    </Box>
  );
};

export default Navbar;
