import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type PostType = {
    posts: string[]
}

const slice = createSlice({
    name: "profile",
    initialState: {} as PostType,
    reducers:{
        addPost: (state, action: PayloadAction<{ message: string }>) => {
            state.posts.push(action.payload.message )
        }
    },
    extraReducers: {}
})

export const profileActions = slice.actions;
export const profileReducer = slice.reducer;


