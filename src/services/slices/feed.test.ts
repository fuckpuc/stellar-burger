import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '../../utils/burger-api';
import { feedStateInterface } from '../../utils/types';
import { RootState } from '../store';
import { feedSlice, getFeeds, initialState } from './feed';

// Мокаем getFeedsApi для тестирования
jest.mock('../../utils/burger-api', () => ({
  getFeedsApi: jest.fn()
}));

// Тесты для редьюсера
describe('feedSlice reducer', () => {
  it('возвращать начальное состояние', () => {
    expect(feedSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('должен обрабатывать getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('должен обрабатывать getFeeds.fulfilled', () => {
    const mockData: TFeedsResponse = {
      success: true,
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Burger',
          createdAt: '',
          updatedAt: '',
          number: 1,
          ingredients: []
        }
      ],
      total: 1,
      totalToday: 1
    };

    const action = { type: getFeeds.fulfilled.type, payload: mockData };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: mockData.orders,
      total: mockData.total,
      totalToday: mockData.totalToday,
      loading: false
    });
  });

  it('должен обрабатывать getFeeds.rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Fetch failed' }
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Fetch failed'
    });
  });
});
