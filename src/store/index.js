import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "../service/api";
import Stations from "../reducers/stations_slice";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    Stations,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    });
};
