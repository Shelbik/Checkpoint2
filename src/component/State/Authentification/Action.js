import {
    ADD_TO_FAVORITE_FAILURE,
    ADD_TO_FAVORITE_REQUEST,
    ADD_TO_FAVORITE_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    DELETE_PROFILE_FAILURE,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_REQUEST
} from "./ActionType";
import axios from "axios";
import { api, API_URL } from "../../config/api";
import { isPresentInFavorites } from "../../config/logic";
import { useNavigate } from 'react-router-dom'; 




export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        // Отправка данных с правильными заголовками
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData, {
            headers: {
                'Content-Type': 'application/json', // Убедитесь, что данные отправляются как JSON
            },
        });

        // Проверка на наличие JWT
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt); // Сохраняем JWT в localStorage
        } else {
            throw new Error("JWT not received from the server");
        }

        // Перенаправление в зависимости от роли
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant");
        } else {
            reqData.navigate("/");
        }

        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        console.log("Register success", data);
    } catch (err) {
        // Обработка ошибок
        const errorMessage = err.response?.data || err.message || "Unknown error";
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
        console.error("Error during registration:", errorMessage);
    }
};
export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);

        // Проверка на наличие JWT
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        } else {
            throw new Error("JWT not received from the server");
        }

        // Перенаправление в зависимости от роли
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant");
        } else {
            reqData.navigate("/");
        }

        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        console.log("Login success", data);
    } catch (err) {
        const errorMessage = err.response?.data || err.message;
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
        console.error("Error during login:", err);
    }
};

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });

    try {
        const { data } = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        dispatch({ type: GET_USER_SUCCESS, payload: data });
        console.log("User profile", data);
    } catch (err) {
        const errorMessage = err.response?.data || err.message;
        dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
        console.error("Error during fetching user profile:", err);
    }
};

export const addToFavorite = ({ jwt, restaurantId }) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST });

    try {
        const { data } = await api.put(
            `/api/restaurants/${restaurantId}/add-favorite`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        // Проверка, не является ли ресторан уже избранным
        const isAlreadyFavorite = isPresentInFavorites(data, restaurantId);
        dispatch({
            type: ADD_TO_FAVORITE_SUCCESS,
            payload: isAlreadyFavorite ? { ...data, message: "Restaurant removed from favorites" } : { ...data, message: "Restaurant added to favorites" }
        });

        console.log("Add to favorite success", data);
    } catch (err) {
        const errorMessage = err.response?.data || err.message;
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: errorMessage });
        console.error("Error during adding to favorite:", err);
    }
};

export const logout = () => async (dispatch) => {
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        console.log("Logout success");
    } catch (err) {
        console.error("Logout error", err);
    }


};

export const updateProfile = (updatedData) => {
    return async (dispatch) => {
        const jwt = localStorage.getItem("jwt"); // Получаем JWT из localStorage

        // Проверяем, есть ли JWT в localStorage
        if (!jwt) {
            console.error("JWT token not found in localStorage");
            return dispatch({ type: UPDATE_PROFILE_FAILURE, payload: "JWT not found" });
        }

        dispatch({ type: UPDATE_PROFILE_REQUEST });

        try {
            // Отправка PUT запроса для обновления данных пользователя
            const { data } = await api.put(`/api/users/profile`, updatedData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,  // Токен авторизации
                    'Content-Type': 'application/json', // Убедитесь, что данные отправляются как JSON
                },
            });

            console.log("Profile update success", data);

            // Отправка action с обновленными данными
            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
        } catch (error) {
            // Логируем ошибку и отправляем action с ошибкой
            console.error("Error during profile update:", error);
            dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.response?.data || error.message });
        }
    };
};
export const deleteAccount = (navigate) => {
    return async (dispatch) => {
        const jwt = localStorage.getItem("jwt");

        if (!jwt) {
            console.error("JWT token not found in localStorage");
            return dispatch({ type: DELETE_PROFILE_FAILURE, payload: "JWT not found" });
        }

        dispatch({ type: DELETE_PROFILE_REQUEST });

        try {
            const { data } = await api.delete(`/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,  
                },
            });

            dispatch({ type: DELETE_PROFILE_SUCCESS, payload: data });
            dispatch(logout());

            // Перенаправление на главную страницу после удаления аккаунта
            const navigate = useNavigate();
            navigate("/");

        } catch (error) {
            console.error("Error during profile deletion:", error);
            dispatch({ type: DELETE_PROFILE_FAILURE, payload: error.response?.data || error.message });
        }
    };
};
