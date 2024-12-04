// store/MenuSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Создаем слайс для состояния бокового меню
const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    open: false,  // Начальное состояние: меню закрыто
  },
  reducers: {
    toggleMenu: (state) => {
      state.open = !state.open;  // Переключаем состояние меню
    },
    openMenu: (state) => {
      state.open = true;  // Открыть меню
    },
    closeMenu: (state) => {
      state.open = false;  // Закрыть меню
    },
  },
});

// Экспортируем действия для использования в компонентах
export const { toggleMenu, openMenu, closeMenu } = menuSlice.actions;

// Экспортируем редьюсер
export default menuSlice.reducer;
