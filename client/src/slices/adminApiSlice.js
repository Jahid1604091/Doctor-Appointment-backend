import { apiSlice } from "./apiSlice";
const URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query:()=> `${URL}/users`,
            providesTags:['Users']
        }),
        getAllDoctors: builder.query({
            query:()=> `${URL}/doctors`,
            providesTags:['Doctors']
        }),
        approveAsDoctor:builder.mutation({
            query:(id)=>({
                url:`${URL}/approve-as-doctor/${id}`,
                method:'PUT',
            }),
            invalidatesTags:['Doctors']
        }),

    })
});

export const {
    useGetAllUsersQuery,
    useGetAllDoctorsQuery,
    useApproveAsDoctorMutation,
} = adminApiSlice;