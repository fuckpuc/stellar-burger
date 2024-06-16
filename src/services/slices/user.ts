import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface UserState {
  errorMsg: string | null;
  isAuthVerified: boolean;
  userInfo: TUser | null;
  isUserRequesting: boolean;
  isOrderRequesting: boolean;
  userOrderHistory: TOrder[];
  registrationInfo: TRegisterData | null;
}

export const initialUserState: UserState = {
  errorMsg: null,
  isAuthVerified: false,
  userInfo: null,
  isUserRequesting: false,
  isOrderRequesting: false,
  userOrderHistory: [],
  registrationInfo: null
};

export const verifyUserAuth = createAsyncThunk(
  'auth/verifyUserAuth',
  async () => {
    try {
      const data = await getUserApi();
      if (data && data.user) {
        return data;
      }
      throw new Error('User not authenticated');
    } catch (error) {
      console.log(`авторизация не пройдена: ${error}`);
      throw new Error('Failed to verify user authentication');
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  'auth/registerUser',
  async (registrationInfo: TRegisterData) => {
    try {
      const data = await registerUserApi(registrationInfo);
      return data;
    } catch (error) {
      throw new Error('Failed to register user');
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: TLoginData) => {
    try {
      const data = await loginUserApi({ email, password });
      if (!data.success) {
        throw new Error('Login failed');
      }
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    } catch (error) {
      throw new Error('Failed to login user');
    }
  }
);

export const updateUserDataThunk = createAsyncThunk(
  'auth/updateUserData',
  async (data: Partial<TRegisterData>) => {
    try {
      const updatedData = await updateUserApi(data);
      return updatedData;
    } catch (error) {
      throw new Error('Failed to update user data');
    }
  }
);

export const fetchUserDataThunk = createAsyncThunk(
  'auth/fetchUserData',
  async () => {
    try {
      const data = await getUserApi();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  }
);

export const fetchUserOrdersThunk = createAsyncThunk(
  'auth/fetchUserOrders',
  async () => {
    try {
      const data = await getOrdersApi();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch user orders');
    }
  }
);

export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async () => {
  try {
    await logoutApi();
    localStorage.clear();
    deleteCookie('accessToken');
  } catch (error) {
    throw new Error('Failed to logout user');
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isUserRequesting = true;
        state.errorMsg = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isUserRequesting = false;
        state.isAuthVerified = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isUserRequesting = false;
        state.errorMsg = action.error.message as string;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.isUserRequesting = true;
        state.errorMsg = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isUserRequesting = false;
        state.isAuthVerified = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isUserRequesting = false;
        state.errorMsg = action.error.message as string;
      })
      .addCase(fetchUserDataThunk.pending, (state) => {
        state.isUserRequesting = true;
        state.errorMsg = null;
      })
      .addCase(fetchUserDataThunk.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isUserRequesting = false;
        state.isAuthVerified = true;
      })
      .addCase(fetchUserDataThunk.rejected, (state, action) => {
        state.userInfo = null;
        state.isUserRequesting = false;
        state.errorMsg = action.error.message as string;
      })
      .addCase(fetchUserOrdersThunk.pending, (state) => {
        state.isOrderRequesting = true;
        state.errorMsg = null;
      })
      .addCase(fetchUserOrdersThunk.fulfilled, (state, action) => {
        state.userOrderHistory = action.payload;
        state.isOrderRequesting = false;
      })
      .addCase(fetchUserOrdersThunk.rejected, (state, action) => {
        state.isOrderRequesting = false;
        state.errorMsg = action.error.message as string;
      })
      .addCase(updateUserDataThunk.pending, (state) => {
        state.isUserRequesting = true;
        state.errorMsg = null;
      })
      .addCase(updateUserDataThunk.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isUserRequesting = false;
        state.isAuthVerified = true;
      })
      .addCase(updateUserDataThunk.rejected, (state, action) => {
        state.isUserRequesting = false;
        state.errorMsg = action.error.message as string;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.isUserRequesting = true;
        state.errorMsg = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.userInfo = null;
        state.isUserRequesting = false;
        state.isAuthVerified = false;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isUserRequesting = false;
        state.errorMsg = action.error.message as string;
      })
      .addCase(verifyUserAuth.pending, (state) => {
        state.isUserRequesting = true;
        state.errorMsg = null;
      })
      .addCase(verifyUserAuth.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isAuthVerified = true;
        state.isUserRequesting = false;
      })
      .addCase(verifyUserAuth.rejected, (state, action) => {
        state.userInfo = null;
        state.isAuthVerified = false;
        state.isUserRequesting = false;
        state.errorMsg = action.error.message as string;
      });
  }
});

// Selectors
export const selectCurrentUser = (state: UserState) => state.userInfo;
export const selectUserOrderHistory = (state: UserState) =>
  state.userOrderHistory;
export const selectIsOrderRequesting = (state: UserState) =>
  state.isOrderRequesting;
export const selectIsUserRequesting = (state: UserState) =>
  state.isUserRequesting;
export const selectIsAuthVerified = (state: UserState) => state.isAuthVerified;
