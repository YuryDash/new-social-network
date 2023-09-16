import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'

export const rootReducer = combineReducers({

})


export const store = configureStore({
    reducer: rootReducer,
})

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

