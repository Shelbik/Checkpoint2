import { TextField, Typography, Button } from "@mui/material"; 
import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

const initialValues = {
    email: "",
    password: ""
}

export default function LoginForm() {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <div>
            <Typography variant="h5" className="text-center">
                Login
            </Typography>

            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>
                    <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                    />

                    <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />

                    <Button sx={{ mt: 2 }} fullWidth type="submit" variant="contained">Login</Button> 
                </Form>
            </Formik>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?
                <Button size="small" onClick={() => navigate("/account/register")}>
                    Register
                </Button>
            </Typography>
        </div>
    );
}
