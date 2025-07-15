import { getContract } from "@/assets/contract";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toast";

export const fetchRegisterLandlord = createAsyncThunk(
    "regLandlord/fetchRegisterLandlord",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            console.log(contract.target)
            const register = await contract.registerHostelOwner();
            await register.wait();
            console.log(register);
            toast.success("Landlord Registered Successfully!")
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
