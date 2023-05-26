import { apiSlice } from "./apiSlice";
const URL = '/api/doctors';

export const doctorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDoctorById: builder.query({
            query:(id)=> `${URL}/${id}`,
            providesTags:['Doctors']
        }),
    })
});

export const {
    useGetDoctorByIdQuery
} = doctorApiSlice;