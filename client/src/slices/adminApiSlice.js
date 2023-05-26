import { apiSlice } from "./apiSlice";
const URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query:()=> `${URL}/users`,
        }),
        getAllDoctors: builder.query({
            query:()=> `${URL}/doctors`,
        }),

    })
});

export const {
    useGetAllUsersQuery,
    useGetAllDoctorsQuery,
} = adminApiSlice;