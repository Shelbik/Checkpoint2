import axios from 'axios';
import { api, API_URL } from "../../config/api";
import { useNavigate } from 'react-router-dom'; 

import {
GET_USER_REQUEST,
GET_USER_FAILURE,
GET_USER_SUCCESS,
DELETE_PROFILE_FAILURE,
DELETE_PROFILE_SUCCESS,
DELETE_PROFILE_REQUEST,
REGISTER_FAILURE,
REGISTER_SUCCESS,
REGISTER_REQUEST,UPDATE_PROFILE_FAILURE,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS
} from "./ActionType"


export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/gigadmin/users`);
    return response.data;  
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Экшен для получения данных пользователя по ID
export const getUserById = async (id) => {
    const jwt = localStorage.getItem("jwt"); // Получаем JWT из localStorage

    // Проверяем, есть ли JWT в localStorage
    if (!jwt) {
        console.error("JWT token not found in localStorage");
        return null; // Возвращаем null, если JWT нет
    }

    try {
        // Отправка GET запроса для получения данных пользователя
        const response = await api.get(`/api/users/profile/${id}`, {
            headers: {
                Authorization: `Bearer ${jwt}`, // Токен авторизации
            },
        });
        return response.data; // Возвращаем данные пользователя
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; // Если ошибка, выбрасываем её
    }
};


export const updateUser = (updatedData, userId, navigate) => {
    return async (dispatch) => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
            console.error("JWT token not found in localStorage");
            return dispatch({ type: UPDATE_PROFILE_FAILURE, payload: "JWT not found" });
        }

        dispatch({ type: UPDATE_PROFILE_REQUEST });

        try {
            const { data } = await api.put(`/api/users/profile/${userId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("Profile update success", data);
            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });

            // Navigate after update
            navigate("/gigadmin/users");
            dispatch(getUsers());
        } catch (error) {
            console.error("Error during profile update:", error);
            dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.response?.data || error.message });
        }
    };
};

export const deleteAccount = (userId, navigate) => {
    return async (dispatch) => {
        const jwt = localStorage.getItem("jwt");

        if (!jwt) {
            console.error("JWT token not found in localStorage");
            return dispatch({ type: DELETE_PROFILE_FAILURE, payload: "JWT not found" });
        }

        dispatch({ type: DELETE_PROFILE_REQUEST });

        try {
            const { data } = await api.delete(`/api/users/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            dispatch({ type: DELETE_PROFILE_SUCCESS, payload: data });
            dispatch(getUsers());

            // Navigate after deletion
            navigate("/");
        } catch (error) {
            console.error("Error during profile deletion:", error);
            dispatch({ type: DELETE_PROFILE_FAILURE, payload: error.response?.data || error.message });
        }
    };
};



export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
      
      const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData, {
          headers: {
              'Content-Type': 'application/json', 
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
          reqData.navigate("/gigadmin/users");
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