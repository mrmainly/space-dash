import { api } from "./api";

export const stations_slice = api.injectEndpoints({
    endpoints: (build) => ({
        getStations: build.query({
            query: () => `stations/`,
        }),
        getStationsSlug: build.query({
            query: ({ slug }) => `stations/${slug}/`,
        }),
    }),
});

export const { useGetStationsQuery, useGetStationsSlugQuery } = stations_slice;
