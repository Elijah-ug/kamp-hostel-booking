import { createSlice } from "@reduxjs/toolkit";
import { fetchLandlordProfile } from "./landlordProfileThunk";

const initialState = {
    profile: {
        balance: "0",
        user: null,
        isRegistered: false,
        hasHostel: false,
    },
    loading: false,
    error: null
}

const landlordProfileSlice = createSlice({
    name: "landlord",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchLandlordProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLandlordProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchLandlordProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Undefined Error happened"
            })
    }
})
export default landlordProfileSlice.reducer;
