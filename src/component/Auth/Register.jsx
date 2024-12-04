import {
    Select,
    TextField,
    Typography,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    InputAdornment,
} from "@mui/material";
import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentification/Action";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const initialValues = {
    fullname: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER",
};

const ROLE_CUSTOMER = "ROLE_CUSTOMER";
const ROLE_RESTAURANT_OWNER = "ROLE_RESTAURANT_OWNER";

const validationSchema = Yup.object({
    fullname: Yup.string()
        .min(3, "Full name must be at least 3 characters")
        .required("Full name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required")
        .matches(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Invalid email address format"
        ),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>+\-_]).{6,}$/,
            "Password must contain at least one letter, one number, and one special character"
        ),
    role: Yup.string()
        .oneOf(
            [ROLE_CUSTOMER, ROLE_RESTAURANT_OWNER],
            "Please select a valid role"
        )
        .required("Role is required"),
});

export default function RegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const fullnameRef = React.useRef(null);

    React.useEffect(() => {
        fullnameRef.current?.focus();
    }, []);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await dispatch(registerUser({ userData: values, navigate }));
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <Typography variant="h5" align="center">
                Register
            </Typography>

            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="fullname"
                            label="Full name"
                            fullWidth
                            variant="outlined"
                            inputRef={fullnameRef}
                            error={touched.fullname && Boolean(errors.fullname)}
                            helperText={touched.fullname && errors.fullname}
                        />

                        <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <Field
                            as={TextField}
                            name="password"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            margin="normal"
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormControl fullWidth margin="normal" error={touched.role && Boolean(errors.role)}>
                            <InputLabel id="role-select-label">Role</InputLabel>
                            <Field
                                as={Select}
                                labelId="role-select-label"
                                id="role-select"
                                name="role"
                                label="Role"
                            >
                                <MenuItem value={ROLE_CUSTOMER}>Customer</MenuItem>
                                <MenuItem value={ROLE_RESTAURANT_OWNER}>Restaurant Owner</MenuItem>
                            </Field>
                        </FormControl>
                        <Typography variant="caption" color="error">
                            {touched.role && errors.role}
                        </Typography>

                        <Button
                            sx={{ mt: 2 }}
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </Form>
                )}
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
