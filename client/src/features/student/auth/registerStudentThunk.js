import { getContract } from "@/assets/contract";
import  {createAsyncThunk}  from "@reduxjs/toolkit";
import { toast } from "react-toast";

export const fetchRegisterStudent = createAsyncThunk(
    "regStudent/fetchRegisterStudent",
    async (_, {rejectWithValue}) => {
        try {
            const contract = await getContract();
            const register = await contract.registerTenant();
            await register.wait();
            toast.success("Tenant Registered Successfully!")
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
