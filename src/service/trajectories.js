import { api } from "./api";

export const Trajectories = api.injectEndpoints({
    endpoints: (build) => ({
        getTrajectories: build.query({
            query: () => `trajectories/`,
        }),
        getTrajectoriesSlug: build.query({
            query: ({ slug }) => `trajectories/${slug}/`,
        }),
    }),
});

export const { useGetTrajectoriesQuery, useGetTrajectoriesSlugQuery } =
    Trajectories;
