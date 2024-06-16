// путь src\services\rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredients';
import { burgerConstructorSlice } from './slices/burgerConstructor';
import { userSlice } from './slices/user';
import { feedSlice } from './slices/feed';
import { orderSlice } from './slices/orders';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  feed: feedSlice.reducer,
  orders: orderSlice.reducer
});
