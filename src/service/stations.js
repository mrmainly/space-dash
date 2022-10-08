import { api } from "./api";

export const Stations = api.injectEndpoints({
    endpoints: (build) => ({
        //аттестуемые
        getStations: build.query({
            query: () => `satellites/`,
        }),
    }),
});

export const { useGetStationsQuery } = Stations;
