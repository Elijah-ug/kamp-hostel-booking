import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchReturnAllProperties } from "@/features/public/view/propertyThunk";
import { fetchReceiptThunk } from "@/features/public/receipts/receiptThunk";
import { getContract } from "@/assets/contract";
import { fetchStudentProfile } from "../profile/studentProfileThunk";
import { toast } from "react-toast";

export const fetchHostelRentRequest = createAsyncThunk(
    "request/fetchPropertyRentRequest",
    async ({propertyId}, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getContract();
            const request = await contract.propertyRentRequest(propertyId);
            await request.wait();
            dispatch(fetchStudentProfile());
            dispatch(fetchReturnAllProperties());
            dispatch(fetchReceiptThunk())
            toast.success("Request sent")
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
