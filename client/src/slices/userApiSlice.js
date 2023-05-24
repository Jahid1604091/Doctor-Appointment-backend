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
                url:`${URL}/doctor`,
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
    useLogoutMutation
} = userApiSlice;