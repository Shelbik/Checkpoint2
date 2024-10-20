import { Select, TextField, Typography, Button, MenuItem } from "@mui/material"; 
import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

const initialValues = {
    fullname: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
};

const ROLE_CUSTOMER = "ROLE_CUSTOMER"; 
const ROLE_RESTAURANT_OWNER = "ROLE_RESTAURANT_OWNER";

export default function RegisterForm() {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log("form values", values);
    };

    return (
        <div>
            <Typography variant="h5" className="text-center">
                Register
            </Typography>

            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>
                    <Field
                        as={TextField}
                        name="fullname"
                        label="Full name"
                        fullWidth
                        variant="outlined"
                    />

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

                    <Field
                        fullWidth
                        margin="normal"
                        as={Select}
                        labelId="role-simple-select-label"
                        id="demo-simple-select"
                        name="role"
                        label="Role"
                    >
                        <MenuItem value={ROLE_CUSTOMER}>Customer</MenuItem>
                        <MenuItem value={ROLE_RESTAURANT_OWNER}>Restaurant Owner</MenuItem>
                    </Field>

                    <Button sx={{ mt: 2 }} fullWidth type="submit" variant="contained">Register</Button> 
                </Form>
            </Formik>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account?
                <Button size="small" onClick={() => navigate("/account/login")}>
                    Login
                </Button>
            </Typography>
        </div>
    );
}
