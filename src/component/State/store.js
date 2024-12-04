// store.js

import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentification/Reducer";
import { thunk } from 'redux-thunk';
import { restaurantReducer } from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import menuReducer from './MenuSLice';  // Импортируем редьюсер для бокового меню
import { gigaAdminReducer } from "./GigaAdminPanel/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuItemReducer,
  menuState: menuReducer,
  gigaAdmin: gigaAdminReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
