import { TOrder } from '../../utils/types';
import { orderSlice, getOrderNumber, userOrder } from './orders';
import { initialState } from './orders';

describe('orderSlice reducer', () => {
  it('должен обрабатывать getOrderNumber.pending', () => {
    const action = { type: getOrderNumber.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('должен обрабатывать getOrderNumber.fulfilled', () => {
    const mockOrder: TOrder = {
      _id: '1',
      status: 'done',
      name: 'Test Order',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      number: 123,
      ingredients: ['1', '2', '3']
    };

    const action = { type: getOrderNumber.fulfilled.type, payload: mockOrder };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      order: mockOrder,
      loading: false
    });
  });

  it('должен обрабатывать getOrderNumber.rejected', () => {
    const action = {
      type: getOrderNumber.rejected.type,
      error: { message: 'Failed to fetch order' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Failed to fetch order'
    });
  });

  it('должен обрабатывать userOrder.pending', () => {
    const action = { type: userOrder.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderLoading: true,
      orderError: null
    });
  });

  it('должен обрабатывать userOrder.fulfilled', () => {
    const mockUserOrder: TOrder = {
      _id: '1',
      status: 'done',
      name: 'Test User Order',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      number: 456,
      ingredients: ['1', '2', '3']
    };

    const action = {
      type: userOrder.fulfilled.type,
      payload: { order: mockUserOrder }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userOrder: mockUserOrder,
      orderLoading: false
    });
  });

  it('должен обрабатывать userOrder.rejected', () => {
    const action = {
      type: userOrder.rejected.type,
      error: { message: 'Failed to fetch order' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderLoading: false,
      orderError: 'Failed to fetch order'
    });
  });

  it('должен обрабатывать clearOrder', () => {
    const action = { type: orderSlice.actions.clearOrder.type };
    const state = orderSlice.reducer(
      {
        ...initialState,
        order: {
          _id: '1',
          status: 'done',
          name: 'Test Order',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          number: 123,
          ingredients: ['1', '2', '3']
        }
      },
      action
    );
    expect(state).toEqual({
      ...initialState,
      order: null
    });
  });

  it('должен обрабатывать clearUserOrder', () => {
    const action = { type: orderSlice.actions.clearUserOrder.type };
    const state = orderSlice.reducer(
      {
        ...initialState,
        userOrder: {
          _id: '1',
          status: 'done',
          name: 'Test User Order',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          number: 456,
          ingredients: ['1', '2', '3']
        }
      },
      action
    );
    expect(state).toEqual({
      ...initialState,
      userOrder: null
    });
  });
});
