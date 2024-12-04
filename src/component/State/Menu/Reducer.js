import * as actionTypes from "./ActionType";

const initialState = {
    menuItems: [], // Список пунктов меню
    loading: false, // Индикатор загрузки
    error: null, // Ошибка при выполнении действия
    search: [], // Результаты поиска
    message: null // Сообщения об успехе или другой информации
};

const menuItemReducer = (state = initialState, action) => {
    switch (action.type) {
        // Начало выполнения действий (запросы)
        case actionTypes.CREATE_MENU_ITEM_REQUEST:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case actionTypes.DELETE_MENU_ITEM_REQUEST:
        case actionTypes.SEARCH_MENU_ITEM_REQUEST:
        case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };

        // Успешное выполнение действий
        case actionTypes.CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: [...state.menuItems, action.payload], // Добавление нового элемента
                message: "Food Created Successfully"
            };

        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: action.payload // Замена текущего списка на новый
            };

        case actionTypes.DELETE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: state.menuItems.filter((menuItem) => menuItem.id !== action.payload) // Удаление элемента
            };

        case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.map((menuItem) =>
                    menuItem.id === action.payload.id ? action.payload : menuItem // Обновление элемента
                )
            };

        case actionTypes.SEARCH_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                search: action.payload // Сохранение результатов поиска
            };

        // Ошибки при выполнении действий
        case actionTypes.CREATE_MENU_ITEM_FAILURE:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case actionTypes.DELETE_MENU_ITEM_FAILURE:
        case actionTypes.SEARCH_MENU_ITEM_FAILURE:
        case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload, // Сохранение ошибки
                message: null
            };

        // Действие по умолчанию (возвращаем текущее состояние)
        default:
            return state;
    }
};

export default menuItemReducer;
