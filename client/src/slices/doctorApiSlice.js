import { apiSlice } from "./apiSlice";
const URL = '/api/doctors';

export const doctorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDoctorById: builder.query({
            query: (id) => `${URL}/${id}`

        }),
        
        getAppointmentsAsDoctor: builder.query({
            query: (id) => `${URL}/appointments/doctor/${id}`

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
    useGetAppointmentsAsDoctorQuery,
    useCheckAvailabilityMutation,
} = doctorApiSlice;