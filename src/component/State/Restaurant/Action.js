import { api } from "../../../component/config/api";

import {
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAILURE,
    GET_ALL_RESTAURANT_REQUEST,
    GET_ALL_RESTAURANT_SUCCESS,
    GET_ALL_RESTAURANT_FAILURE,
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_REQUEST,
    UPDATE_RESTAURANT_SUCCESS,
    UPDATE_RESTAURANT_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST,
    GET_RESTAURANT_BY_USER_ID_SUCCESS,
    GET_RESTAURANT_BY_USER_ID_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS,
    UPDATE_RESTAURANT_STATUS_FAILURE,
    CREATE_EVENTS_REQUEST,
    CREATE_EVENTS_SUCCESS,
    CREATE_EVENTS_FAILURE,
    GET_ALL_EVENTS_REQUEST,
    GET_ALL_EVENTS_SUCCESS,
    GET_ALL_EVENTS_FAILURE,
    DELETE_EVENTS_REQUEST,
    DELETE_EVENTS_SUCCESS,
    DELETE_EVENTS_FAILURE,
    GET_RESTAURANTS_EVENTS_REQUEST,
    GET_RESTAURANTS_EVENTS_SUCCESS,
    GET_RESTAURANTS_EVENTS_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    GET_RESTAURANTS_CATEGORY_REQUEST,
    GET_RESTAURANTS_CATEGORY_SUCCESS,
    GET_RESTAURANTS_CATEGORY_FAILURE,
    GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_FAILURE,
    GET_RESTAURANT_BY_ID_SUCCESS,
} from "./ActionTypes";

// Fetch all restaurants
export const getAllRestaurantsAction = (token) => async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
    try {
        const { data } = await api.get("api/restaurants", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
        console.log("Fetched all restaurants: ", data);
    } catch (error) {
        console.error("Error fetching all restaurants: ", error);
        dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error });
    }
};

// Fetch restaurant by ID
export const getRestaurantById = (reqData) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
        const response = await api.get(`api/restaurants/${reqData.restaurantId}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`,
            },
        });
        dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Error fetching restaurant by ID: ", error);
        dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
    }
};

// Fetch restaurant by user ID
export const getRestaurantByUserId = (jwt) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
        const response = await api.get("api/admin/restaurants/user", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        console.log("Fetched restaurant by user ID: ", response.data);
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Error fetching restaurant by user ID: ", error);
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error });
    }
};

// Create a restaurant
export const createRestaurant = (reqData) => async (dispatch) => {
    console.log("Token: ", reqData.token);
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
        const { data } = await api.post("api/admin/restaurant", reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.token}`,
            },
        });
        dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
        console.log("Created restaurant: ", data);
    } catch (error) {
        console.error("Error creating restaurant: ", error);
        dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
    }
};

// Update a restaurant
export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });
    try {
        const res = await api.put(`api/admin/restaurant/${restaurantId}`, restaurantData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data });
        console.log("Updated restaurant: ", res.data);
    } catch (error) {
        console.error("Error updating restaurant: ", error);
        dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
    }
};

// Delete a restaurant
export const deleteRestaurant = ({ restaurantId, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
        await api.delete(`api/admin/restaurant/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        console.log("Deleted restaurant ID: ", restaurantId);
        dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
    } catch (error) {
        console.error("Error deleting restaurant: ", error);
        dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
    }
};

// Update restaurant status
export const updateRestaurantStatus = ({ restaurantId, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
        const res = await api.put(`api/admin/restaurant/${restaurantId}/status`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        console.log("Updated restaurant status: ", res.data);
        dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
        console.error("Error updating restaurant status: ", error);
        dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
};

// Create an event
export const createEventAction = ({ data, jwt, restaurantId }) => async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });
    try {
        const res = await api.post(`api/admin/events/restaurant/${restaurantId}`, data, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        console.log("Created event: ", res.data);
        dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
        console.error("Error creating event: ", error);
        dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
    }
};

// Fetch all events
export const getAllEvents = ({ jwt }) => async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });
    try {
        const res = await api.get("api/events", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        console.log("Fetched all events: ", res.data);
        dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
        console.error("Error fetching events: ", error);
        dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
    }
};

// Delete an event
export const deleteEventAction = ({ eventId, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });
    try {
        await api.delete(`api/admin/events/${eventId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        console.log("Deleted event ID: ", eventId);
        dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
    } catch (error) {
        console.error("Error deleting event: ", error);
        dispatch({ type: DELETE_EVENTS_FAILURE, payload: error });
    }
};

export const getRestaurantEvents = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });

        try {
            const res = await api.get(`/api/admin/events/restaurant/${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    }
                });
            console.log("get restaurants event ", res.data);
            dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
        } catch (error) {
            dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error });
        };
    };
};

export const createCategoryAction = ({ reqData, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_CATEGORY_REQUEST });

        try {
            const res = await api.post(`api/admin/category`, reqData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            console.log("create category ", res.data);
            dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("catch - ", error);
            dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error })
        }
    }
}

export const getRestaurantCategory = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
        try {
            const res = await api.get(`/api/category/restaurant/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("get restaurants category ", res.data);
            dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("error - ", error);
            dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
        }
    }
}