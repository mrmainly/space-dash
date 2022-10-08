import { api } from "./api";

export const Stations = api.injectEndpoints({
    endpoints: (build) => ({
        //аттестуемые
        getStations: build.query({
            query: () => `satellites/`,
        }),
        getStationsSlug: build.query({
            query: ({ slug }) => `satellites/${slug}/`,
        }),
    }),
});

export const { useGetStationsQuery, useGetStationsSlugQuery } = Stations;
