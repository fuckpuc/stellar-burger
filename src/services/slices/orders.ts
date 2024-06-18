import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

export interface orderStateInterface {
  order: TOrder | null;
  userOrder: TOrder | null;
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  orderLoading: boolean;
  orderError: string | null;
}

export const initialState: orderStateInterface = {
  order: null,
  orders: [],
  loading: false,
  error: null,
  userOrder: null,
  orderLoading: false,
  orderError: null
};

export const getOrderNumber = createAsyncThunk(
  'orders/getOrderNumber',
  async (data: number) => {
    const response = await getOrderByNumberApi(data);
    return response.orders[0]; // Возвращаем первый заказ напрямую
  }
);

export const userOrder = createAsyncThunk(
  'user/order',
  async (data: string[]) => orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = null;
    },
    clearUserOrder(state) {
      state.userOrder = null;
    },
    setOrderLoading(state, action) {
      state.orderLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderNumber.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(getOrderNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch order';
      })
      .addCase(userOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(userOrder.fulfilled, (state, action) => {
        state.userOrder = action.payload.order;
        state.orderLoading = false;
      })
      .addCase(userOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.error.message || 'Failed to fetch order';
      });
  }
});

export const { clearOrder } = orderSlice.actions;

//selectors
export const orderLoadingSelector = (state: RootState) => state.orders.loading;
export const orderSelector = (state: RootState) => state.orders.order;

export const userOrderSelector = (state: RootState) => state.orders.userOrder;
export const userOrderLoadingSelector = (state: RootState) =>
  state.orders.orderLoading;

export const { clearUserOrder, setOrderLoading } = orderSlice.actions;
