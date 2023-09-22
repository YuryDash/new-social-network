import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {profileReducer} from "features/main/profile/model/profile-slice";
import {useDispatch} from "react-redux";
import {loginReducer} from "features/login/model/login-slice";
import {appReducer} from "app/model/app-slice";
import {usersReducer} from "features/main/users/model/users-slice";

export const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    app: appReducer,
    users: usersReducer,
})


export const store = configureStore({
    reducer: rootReducer,
})
export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

