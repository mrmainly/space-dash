import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "../service/api";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    });
};
