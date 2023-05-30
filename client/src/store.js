import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
    reducer:{
        app:appReducer,
        auth:authReducer,
       
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true //false in deployment
});