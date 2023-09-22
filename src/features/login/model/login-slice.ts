import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginAPI} from "features/login/api/loginAPI";

export type AuthDataType = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

const initialState: AuthDataType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginMe.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.id = action.payload.userID;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

const loginUser = createAsyncThunk<{ userID: number }, { email: string, password: string, rememberMe: boolean }>
('login/loginUser', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await loginAPI.login(arg.email, arg.password, arg.rememberMe)
        if (res.data.resultCode === 0) {
            dispatch(loginMe())
            console.log(res.data.data.userId)
            return {userID: res.data.data.userId}
        } else {
            let message = res.data.messages.length > 0 ? res.data.messages[0] : "Some Error";
            console.log(message)
            return rejectWithValue(null)
        }
    } catch (e) {
        return rejectWithValue(null)
    }
})

const loginMe = createAsyncThunk<{ id: number, login: string, email: string, isAuth: boolean }, undefined>('login/loginMe', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const res = await loginAPI.me()
        if (res.data.resultCode === 0) {
            const {id, login, email} = res.data.data
            return {id, login, email, isAuth: true}
        } else {
            return rejectWithValue(null)
        }
    } catch (e) {
        return rejectWithValue(null)
    }
})

const logoutUser = createAsyncThunk<any, undefined>('login/logoutUser', async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const res = await loginAPI.logout()
        if( res.data.resultCode === 0 ){
            return {id: null, login: null, email: null, isAuth: false}
        } else {
            rejectWithValue(null)
        }
    } catch (e) {
        return rejectWithValue(null)
    }
})

export const loginActions = slice.actions;
export const loginReducer = slice.reducer;
export const loginThunks = {loginUser, loginMe,logoutUser}