import { TextField, Typography, Button, IconButton, InputAdornment } from "@mui/material";
import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginUser } from "../State/Authentification/Action";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const initialValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object({
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
});

export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState("");  // Для хранения ошибок
    const emailRef = React.useRef(null);

    React.useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const handleSubmit = async (values) => {
        setLoading(true);
        setError(""); // Сброс ошибки перед отправкой запроса
        try {
            const response = await dispatch(loginUser({ userData: values, navigate }));

            // Проверяем ответ и если ошибка - показываем ее
            if (response.error) {
                setError(response.error);  // Ошибка из ответа сервера
            }
        } catch (err) {
            // Если ошибка аутентификации, показываем ошибку
            setError("Invalid email or password");  // Это сообщение можно заменить на более подробное
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{ maxWidth: 400, margin: "0 auto", padding: "20px" }}>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                Login
            </Typography>

            {/* Отображение ошибки, если она есть */}
            {error && (
                <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                            inputRef={emailRef}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <Field
                            as={TextField}
                            name="password"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type={showPassword ? "text" : "password"}
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

                        <Button
                            sx={{ mt: 2 }}
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Login"}
                        </Button>
                    </Form>
                )}
            </Formik>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{" "}
                <Button size="small" onClick={() => navigate("/account/register")}>
                    Register
                </Button>
            </Typography>
        </div>
    );
}
