import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "features/login/api/loginAPI";
import { appActions } from "app/model/app-slice";
import { profileThunks } from "features/main/profile/model/profile-slice";

export type AuthDataType = {
  id: null | number;
  email: null | string;
  login: null | string;
  isAuth: boolean;
};

const initialState: AuthDataType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.id = action.payload.userID;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(loginMe.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

const loginUser = createAsyncThunk<{ userID: number }, { email: string; password: string; rememberMe: boolean }>(
  "login/loginUser",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await loginAPI.login(arg.email, arg.password, arg.rememberMe);
      if (res.data.resultCode === 0) {
        dispatch(loginMe());
        return { userID: res.data.data.userId };
      } else {
        let message = res.data.messages.length > 0 ? res.data.messages[0] : "Some Error";
        return rejectWithValue(null);
      }
    } catch (e) {
      return rejectWithValue(null);
    }
  },
);

const loginMe = createAsyncThunk<{ id: number; login: string; email: string; isAuth: boolean }, undefined>(
  "login/loginMe",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await loginAPI.me();
      if (res.data.resultCode === 0) {
        const { id, login, email } = res.data.data;
        dispatch(profileThunks.getProfile({ userID: id }));
        dispatch(profileThunks.getStatus({ userID: id }));
        dispatch(appActions.setAppInitialized({ isInitialized: true }));
        return { id, login, email, isAuth: true };
      } else {
        dispatch(appActions.setAppInitialized({ isInitialized: true }));
        return rejectWithValue(null);
      }
    } catch (e) {
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
      return rejectWithValue(null);
    }
  },
);

const logoutUser = createAsyncThunk<any, undefined>("login/logoutUser", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await loginAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
      return { id: null, login: null, email: null, isAuth: false };
    } else {
      return rejectWithValue(null);
    }
  } catch (e) {
    return rejectWithValue(null);
  }
});

export const loginActions = slice.actions;
export const loginReducer = slice.reducer;
export const loginThunks = { loginUser, loginMe, logoutUser };
