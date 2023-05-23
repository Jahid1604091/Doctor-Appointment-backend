import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collapsedSidebar:false
}

const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        setCollapsed:(state,action)=>{
            state.collapsedSidebar = action.payload
        }
    }
});

export const {setCollapsed} = appSlice.actions;
export default appSlice.reducer;