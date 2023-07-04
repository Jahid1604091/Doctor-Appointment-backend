import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";
import { apiSlice, countryApiSlice } from "./slices/apiSlice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,

        [apiSlice.reducerPath]: apiSlice.reducer,
        [countryApiSlice.reducerPath]: countryApiSlice.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiSlice.middleware, countryApiSlice.middleware]),
    devTools: true //false in deployment
});