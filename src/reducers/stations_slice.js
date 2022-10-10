import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    slug_station: "sjsa0-sputnix-uhf",
};

export const stations_slice = createSlice({
    name: "stations_slice",
    initialState,
    reducers: {
        changeStation(state, action) {
            state.slug_station = action.payload;
        },
    },
});

export default stations_slice.reducer;
