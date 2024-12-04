import React, { useState, useEffect } from 'react';
import { getUsers } from "../../State/GigaAdminPanel/Action";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    Box,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../State/GigaAdminPanel/Action';
import { registerUser } from '../../State/GigaAdminPanel/Action';
import {
    Select,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { getUserById } from '../../State/GigaAdminPanel/Action';

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
        .oneOf([ROLE_CUSTOMER, ROLE_RESTAURANT_OWNER], "Please select a valid role")
        .required("Role is required"),
});

const AdminUsers = () => {
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [openDialog, setOpenDialog] = useState(false);  // State for delete confirmation dialog
    const [selectedUserId, setSelectedUserId] = useState(null); // For the user to be deleted
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async () => {
        try {
            // Удаление пользователя
            await deleteAccount(selectedUserId, navigate);
    
            // Обновление списка пользователей, удаляя только что удаленного пользователя
            setUsers(users.filter(user => user.id !== selectedUserId));
    
            // Отображение сообщения об успешном удалении
            setSnackbarMessage("Пользователь удален успешно!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
    
            // Закрытие диалога
            setOpenDialog(false);
            
            // Навигация, чтобы обновить список пользователей
            navigate("/gigadmin/users");
        } catch (error) {
            setSnackbarMessage("Ошибка при удалении пользователя.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            setOpenDialog(false);
        }
    };
    

    const handleDeleteClick = (id) => {
        setSelectedUserId(id);
        setOpenDialog(true); // Open the confirmation dialog
    };

    const handleEdit = (id) => {
        navigate(`/gigadmin/users/edit/${id}`);
        dispatch(getUserById(id));
    };

    const toggleRegisterForm = () => {
        setShowRegisterForm(!showRegisterForm);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleRegisterSubmit = async (values, { resetForm }) => {
        try {
            await dispatch(registerUser({ userData: values, navigate }));
            toggleRegisterForm();
            setShowRegisterForm(false);
            setSnackbarMessage("Пользователь успешно зарегистрирован!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            resetForm();
        } catch (error) {
            setSnackbarMessage("Ошибка регистрации. Попробуйте еще раз.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Box sx={{ padding: 3, marginLeft: '20vw' }}>
            <Typography variant="h4" gutterBottom>Users List</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={toggleRegisterForm}
                sx={{ marginBottom: '20px' }}
            >
                {showRegisterForm ? "Close Form" : "Add User"}
            </Button>

            {showRegisterForm && (
                <Box sx={{ marginBottom: 3 }}>
                    <Typography variant="h5" align="center">Register New User</Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleRegisterSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="fullname"
                                    label="Full name"
                                    fullWidth
                                    variant="outlined"
                                    error={touched.fullname && Boolean(errors.fullname)}
                                    helperText={touched.fullname && errors.fullname}
                                    sx={{ marginBottom: 2 }}
                                />
                                <Field
                                    as={TextField}
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ marginBottom: 2 }}
                                />
                                <Field
                                    as={TextField}
                                    name="password"
                                    label="Password"
                                    fullWidth
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ marginBottom: 2 }}
                                />
                                <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                                    <InputLabel id="role-select-label">Role</InputLabel>
                                    <Field
                                        as={Select}
                                        labelId="role-select-label"
                                        name="role"
                                        label="Role"
                                    >
                                        <MenuItem value={ROLE_CUSTOMER}>Customer</MenuItem>
                                        <MenuItem value={ROLE_RESTAURANT_OWNER}>Restaurant Owner</MenuItem>
                                    </Field>
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Register
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            )}

            {!showRegisterForm && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Full Name</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.fullname}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleEdit(user.id)}
                                            sx={{ marginRight: "10px" }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteClick(user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            {/* Delete confirmation dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this user?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminUsers;
