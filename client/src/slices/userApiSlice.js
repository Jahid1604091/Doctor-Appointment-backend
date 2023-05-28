import { apiSlice } from "./apiSlice";
const URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        
        login:builder.mutation({
            query:(data)=>({
                url:`${URL}/auth`,
                method:'POST',
                body:data
            })
        }),

        register:builder.mutation({
            query:(data)=>({
                url:`${URL}`,
                method:'POST',
                body:data
            })
        }),

        registerAsDoctor:builder.mutation({
            query:(data)=>({
                url:`${URL}/apply-as-doctor`,
                method:'POST',
                body:data
            })
        }),

        updateProfile:builder.mutation({
            query:(data)=>({
                url:`${URL}/profile`,
                method:'PUT',
                body:data
            })
        }),

        deleteProfile:builder.mutation({
            query:()=>({
                url:`${URL}/profile`,
                method:'DELETE',
            })
        }),
        
        markAllAsRead:builder.mutation({
            query:()=>({
                url:`${URL}/mark-all-as-read`,
                method:'PUT',
            })
        }),
        
        getAllApprovedDoctors: builder.query({
            query:()=> `${URL}/approved-doctors`,
        }),
        
        newAppointment:builder.mutation({
            query:(data)=>({
                url:`${URL}/appointment`,
                method:'POST',
                body:data
            })
        }),

        logout:builder.mutation({
            query:()=>({
                url:`${URL}/logout`,
                method:'POST',
            })
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
    useNewAppointmentMutation,
    useLogoutMutation
} = userApiSlice;