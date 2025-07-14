import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentProfile } from "./studentProfileThunk";

const initialState = {
    studentProf: {
        balance: "0",
        user: null,
        hasActiveRent: false,
        isRegistered: false,
    },
    loading: false,
    error: null
}

const studentProfileSlice = createSlice({
    name: "student",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStudentProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.tenantProf = action.payload;
            })
            .addCase(fetchStudentProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Undefined Error happened"
            })
    }
})
export default studentProfileSlice.reducer;
