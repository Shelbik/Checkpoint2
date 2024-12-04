import { Modal, Box, MenuItem } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "./Register";
import LoginForm from "./Login";

export const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOnClose = () => {
        navigate("/");
    }

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,

    };

    return (
        <>
            <Modal
                onClose={handleOnClose}
                open={location.pathname === "/account/register" || location.pathname === "/account/login"}
            >
                <Box sx={style}
                >
                    {location.pathname === "/account/register" ? <RegisterForm /> : <LoginForm />}
                </Box>
            </Modal>
        </>
    );
};
