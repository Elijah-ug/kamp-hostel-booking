import { getContract } from "@/assets/contract";
import { fetchLandlordProfile } from "@/features/landlord/profile/landlordProfileThunk";
import { fetchStudentProfile } from "@/features/student/profile/studentProfileThunk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchUserWithdraw = createAsyncThunk(
    "withdraw/fetchUserWithdraw",
    async ({amount}, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getContract();
            const withdraw = await contract.userWithdraw(amount);
            await withdraw.wait();
            toast.success("withdrawn successfully");
            dispatch(fetchLandlordProfile());
            dispatch(fetchStudentProfile());
            console.log("withdrawn successfully");
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
