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

const initialState = {
    user: null,
    isLoading: false,
    jwt: localStorage.getItem("jwt") || null,  // Загружаем JWT из localStorage
    favorites: [],
    success: null,
    error: null,
    isLoggedIn: false,  // Добавляем флаг для отслеживания статуса авторизации
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
        case UPDATE_PROFILE_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                isLoggedIn: true,  // Пользователь вошел в систему
                success: "Operation successful",
                error: null,
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: null,
            };

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload, // Обновляем данные пользователя
                success: "Profile updated successfully",
                error: null,
            };

        case ADD_TO_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                favorites: action.payload.message.includes("added")
                    ? [action.payload, ...state.favorites]
                    : state.favorites.filter(fav => fav.id !== action.payload.id),
                success: action.payload.message,
                error: null,
            };

        case LOGOUT:
            return { ...initialState, jwt: null, isLoggedIn: false };  // Сбрасываем все данные о пользователе

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
        case UPDATE_PROFILE_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null };

        default:
            return state;
    }
};

export default authReducer;
