import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersAPI} from "features/main/users/api/usersAPI";

type UsersState = {
    users: UserItem[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

export type UserItem = {
    item: {
        followed: boolean
        id: number
        name: string
        "photos": {
            small: null | string,
            large: null | string
        }
        "status": null | string,
        uniqueUrlName: string | null
    }
}

export type UsersResponseType = {
    items: UserItem[]
    totalCount: number,
    error: null
}

const initialState: UsersState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 13,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}


const slice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload.users.items
            state.totalUsersCount = action.payload.users.totalCount
        })
    }
})

const getUsers = createAsyncThunk<{ users: UsersResponseType }, { currentPage: number, pageSize: number }>
('users/getUsers', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        debugger
        const res = await usersAPI.getUsers(arg.currentPage, arg.pageSize)
        return {users: res.data}
    } catch (e) {
        return rejectWithValue(null)
    }
})

export const usersActions = slice.actions;
export const usersReducer = slice.reducer;
export const usersThunks = {getUsers};