import { getContract } from "@/assets/contract";
import { fetchReturnAllProperties } from "@/features/public/view/propertyThunk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toast";

export const fetchRegisterHostel = createAsyncThunk(
    "hostel/fetchRegisterHostel",
    async ({location, rooms, amount}, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getContract();
            const property = await contract.registerProperties(location, rooms, amount);
            await property.wait();
            toast.success("Property registered successfully");
            dispatch(fetchReturnAllProperties())
            return true;
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.message);
        }
    }

)
