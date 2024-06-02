import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import {
  TypedUseSelectorHook,
  useDispatch as reduxDispatch,
  useSelector as reduxSelector
} from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => reduxDispatch();
export const useSelector: TypedUseSelectorHook<RootState> = reduxSelector;

export default store;
