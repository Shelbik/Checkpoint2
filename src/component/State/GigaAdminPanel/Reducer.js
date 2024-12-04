import {
    GET_USER_REQUEST,
    GET_USER_FAILURE,
    GET_USER_SUCCESS,
    DELETE_PROFILE_FAILURE,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_REQUEST,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_REQUEST

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
export const gigaAdminReducer = (state = initialState, action) => {

    switch (action.type) {
        case REGISTER_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };


        case REGISTER_SUCCESS:
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: null,
            };

        case REGISTER_FAILURE:
        case GET_USER_FAILURE:

            return { ...state, isLoading: false, error: action.payload, success: null };

        default:
            return state;
    }
};

