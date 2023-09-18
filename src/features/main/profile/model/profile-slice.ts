import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { v1 } from "uuid";

export type ProfileType = {
    posts: PostType[]
}
export type PostType = {
    postID: string
    postMessage: string
    date?: string
}


const slice = createSlice({
    name: "profile",
    initialState: {
        posts: [] as PostType[]
    },

    reducers:{
        addPost: (state, action: PayloadAction<{ message: string }>) => {
            const newPost: PostType = {postID: v1(), postMessage: action.payload.message }
            state.posts.unshift( newPost )
        }

    },
    extraReducers: {}
})

export const profileActions = slice.actions;
export const profileReducer = slice.reducer;


