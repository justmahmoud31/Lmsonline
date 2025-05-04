import { createSlice } from "@reduxjs/toolkit";
import { getMyData } from "./getProfileApi";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileData : {},
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers : (builder)=>{
        builder 
        .addCase(getMyData.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getMyData.fulfilled,(state,action)=>{
            state.loading = false;
            state.profileData = action.payload.data;
        })
    }
});
export default profileSlice.reducer;