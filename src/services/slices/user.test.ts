import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '../../utils/types';
import {
  userSlice,
  registerUserThunk,
  loginUserThunk,
  fetchUserDataThunk,
  fetchUserOrdersThunk,
  updateUserDataThunk,
  logoutUserThunk,
  UserState,
  initialUserState
} from './user';

describe('userSlice reducer', () => {
  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      number: 1,
      ingredients: ['ingredient1']
    }
  ];

  it('должно возвращать начальное состояние', () => {
    expect(userSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialUserState
    );
  });

  it('должен обрабатывать registerUserThunk.pending', () => {
    const action = { type: registerUserThunk.pending.type };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isUserRequesting: true,
      errorMsg: null
    });
  });

  it('должен обрабатывать registerUserThunk.fulfilled', () => {
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      userInfo: mockUser,
      isUserRequesting: false,
      isAuthVerified: true
    });
  });

  it('должен обрабатывать registerUserThunk.rejected', () => {
    const action = {
      type: registerUserThunk.rejected.type,
      error: { message: 'Failed to register user' }
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isUserRequesting: false,
      errorMsg: 'Failed to register user'
    });
  });

  it('должен обрабатывать loginUserThunk.pending', () => {
    const action = { type: loginUserThunk.pending.type };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isUserRequesting: true,
      errorMsg: null
    });
  });

  it('должен обрабатывать loginUserThunk.fulfilled', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      userInfo: mockUser,
      isUserRequesting: false,
      isAuthVerified: true
    });
  });

  it('должен обрабатывать loginUserThunk.rejected', () => {
    const action = {
      type: loginUserThunk.rejected.type,
      error: { message: 'Failed to login user' }
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isUserRequesting: false,
      errorMsg: 'Failed to login user'
    });
  });

  it('должен обрабатывать fetchUserDataThunk.pending', () => {
    const action = { type: fetchUserDataThunk.pending.type };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isUserRequesting: true,
      errorMsg: null
    });
  });

  it('должен обрабатывать fetchUserDataThunk.fulfilled', () => {
    const action = {
      type: fetchUserDataThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      userInfo: mockUser,
      isUserRequesting: false,
      isAuthVerified: true
    });
  });

  it('должен обрабатывать fetchUserDataThunk.rejected', () => {
    const action = {
      type: fetchUserDataThunk.rejected.type,
      error: { message: 'Failed to fetch user data' }
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      userInfo: null,
      isUserRequesting: false,
      errorMsg: 'Failed to fetch user data'
    });
  });

  it('должен обрабатывать fetchUserOrdersThunk.pending', () => {
    const action = { type: fetchUserOrdersThunk.pending.type };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isOrderRequesting: true,
      errorMsg: null
    });
  });

  it('должен обрабатывать fetchUserOrdersThunk.fulfilled', () => {
    const action = {
      type: fetchUserOrdersThunk.fulfilled.type,
      payload: mockOrders
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      userOrderHistory: mockOrders,
      isOrderRequesting: false
    });
  });

  it('должен обрабатывать fetchUserOrdersThunk.rejected', () => {
    const action = {
      type: fetchUserOrdersThunk.rejected.type,
      error: { message: 'Failed to fetch user orders' }
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isOrderRequesting: false,
      errorMsg: 'Failed to fetch user orders'
    });
  });

  it('должен обрабатывать updateUserDataThunk.pending', () => {
    const action = { type: updateUserDataThunk.pending.type };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isUserRequesting: true,
      errorMsg: null
    });
  });

  it('должен обрабатывать updateUserDataThunk.fulfilled', () => {
    const action = {
      type: updateUserDataThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      userInfo: mockUser,
      isUserRequesting: false,
      isAuthVerified: true
    });
  });

  it('должен обрабатывать updateUserDataThunk.rejected', () => {
    const action = {
      type: updateUserDataThunk.rejected.type,
      error: { message: 'Failed to update user data' }
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isUserRequesting: false,
      errorMsg: 'Failed to update user data'
    });
  });

  it('должен обрабатывать logoutUserThunk.pending', () => {
    const action = { type: logoutUserThunk.pending.type };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isUserRequesting: true,
      errorMsg: null
    });
  });

  it('должен обрабатывать logoutUserThunk.fulfilled', () => {
    const action = { type: logoutUserThunk.fulfilled.type };
    const state = userSlice.reducer(
      {
        ...initialUserState,
        userInfo: {
          email: 'test@example.com',
          name: 'Test User'
        }
      },
      action
    );
    expect(state).toEqual({
      ...initialUserState,
      userInfo: null,
      isUserRequesting: false,
      isAuthVerified: false
    });
  });

  it('должен обрабатывать logoutUserThunk.rejected', () => {
    const action = {
      type: logoutUserThunk.rejected.type,
      error: { message: 'Failed to logout user' }
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isUserRequesting: false,
      errorMsg: 'Failed to logout user'
    });
  });
});
