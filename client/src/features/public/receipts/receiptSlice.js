import { createSlice } from "@reduxjs/toolkit";
import { fetchReceiptThunk } from "./receiptThunk";

const initialState = {
    userReceipt: {
        hostelId: null,
        startDate: null,
        endDate: null,
        owner: null,
        student: null,
        isSigned: false,
        isPaid: false,
        propertyName: null,
    },
    loading: false,
    error: null
}

const landlordReceiptslice = createSlice({
    name: "receipt",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchReceiptThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReceiptThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userReceipt = action.payload;
            })
            .addCase(fetchReceiptThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Undefined Error happened"
            })
    }
})
export default landlordReceiptslice.reducer;
