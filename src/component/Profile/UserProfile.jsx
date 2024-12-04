import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentification/Action';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  


const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Извлекаем данные пользователя из Redux хранилища
    const { auth } = useSelector((store) => store);

    // Обработчик выхода
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };




    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
            <div className="flex flex-col items-center justify-center">
                <AccountCircleIcon sx={{ fontSize: "9rem" }} />
                <h1 className="py-5 text-2xl font-semibold"></h1>

                <p>Email: {auth.user ? auth.user.email : "Loading..."}</p>

             
                <Button variant="contained" onClick={handleLogout} sx={{ margin: "2rem 0rem" }}>
                    Logout
                </Button>

            </div>
        </div>
    );
};

export default UserProfile;
