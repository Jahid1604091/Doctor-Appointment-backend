import { apiSlice, countryApiSlice } from "./apiSlice";
const URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (data) => ({
                url: `${URL}/auth`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        registerAsDoctor: builder.mutation({
            query: (data) => ({
                url: `${URL}/apply-as-doctor`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${URL}/profile`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        deleteProfile: builder.mutation({
            query: () => ({
                url: `${URL}/profile`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),

        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `${URL}/appointments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),

        markAllAsRead: builder.mutation({
            query: () => ({
                url: `${URL}/mark-all-as-read`,
                method: 'PUT',
            }),
            invalidatesTags: ['User']
        }),

        getAllApprovedDoctors: builder.query({
            query: () => `${URL}/approved-doctors`,
            // transformResponse: (response, meta, arg) => response.data,
            // transformErrorResponse: (response, meta, arg) => response.status,
            providesTags: ['User'],
        }),

        getAllAppointments: builder.query({
            query: () => `${URL}/booked-appointments`,
            providesTags: ['User']
        }),

        newAppointment: builder.mutation({
            query: (data) => ({
                url: `${URL}/appointment`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${URL}/logout`,
                method: 'POST',
            }),
            invalidatesTags: ['User']
        }),

        uploadAvatar: builder.mutation({
            query: (data) => ({
                url: `/api/upload/avatar`,
                method: 'POST',
                body: data,
                formData: true
            }),
            invalidatesTags: ['User']
        }),

        uploadFile: builder.mutation({
            query: (data) => ({
                url: `api/upload/file`,
                method: 'POST',
                body: data,
                formData: true
            }),
            invalidatesTags: ['User']
        }),



    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useRegisterAsDoctorMutation,
    useUpdateProfileMutation,
    useDeleteProfileMutation,
    useMarkAllAsReadMutation,
    useGetAllApprovedDoctorsQuery,
    useGetAllAppointmentsQuery,
    useNewAppointmentMutation,
    useLogoutMutation,
    useDeleteAppointmentMutation,
    useUploadFileMutation,
    useUploadAvatarMutation,

} = userApiSlice;
