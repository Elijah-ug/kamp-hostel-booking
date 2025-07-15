import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "@/assets/contract";
import { fetchStudentProfile } from "../profile/studentProfileThunk";
import { toast } from "react-toast";

export const fetchStudentDeposit = createAsyncThunk(
    "deposit/fetchStudentDeposit",
    async ({amount}, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getContract();
            const deposit = await contract.studentDeposit({ value: amount });
            await deposit.wait();
            dispatch(fetchStudentProfile());
            toast.success("Deposited successfully");
            console.log("deposited");
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
