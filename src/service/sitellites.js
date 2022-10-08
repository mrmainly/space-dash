import { api } from "./api";

export const Certified = api.injectEndpoints({
    endpoints: (build) => ({
        //аттестуемые
        getCertified: build.query({
            query: ({ currentPage, ordering, fullName, application }) =>
                `tutor/tester?page=${currentPage}&ordering=${ordering}&full_name=${fullName}&application=${application}`,
        }),
        //аттестуемый
        getCertifiedId: build.query({
            query: ({ id }) => `tutor/tester/${id}`,
        }),
    }),
});

export const { useGetCertifiedIdQuery, useGetCertifiedQuery } = Certified;
