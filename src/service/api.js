import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://gsn.yktaero.space/api/",
});

export const api = createApi({
    reducerPath: "splitApi",

    baseQuery: baseQuery,

    tagTypes: [],

    endpoints: () => ({}),
});
