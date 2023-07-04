import { apiSlice } from "./apiSlice";
const URL = '/api/doctors';

export const doctorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDoctorById: builder.query({
            query: (id) => `${URL}/${id}`

        }),
        getDoctorDetailsByUserId: builder.query({
            query:(id)=>`${URL}/get-doctor/${id}`,
            
        }),

        checkAvailability: builder.mutation({
            query: (data) => ({
                    url: `${URL}/check-availability`,
                    method: 'POST',
                    body:data
                })
        }),

    })
});

export const {
    useGetDoctorByIdQuery,
    useCheckAvailabilityMutation,
    useGetDoctorDetailsByUserIdQuery,
} = doctorApiSlice;