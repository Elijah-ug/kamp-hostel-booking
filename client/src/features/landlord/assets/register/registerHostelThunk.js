import { getContract } from "@/assets/contract";
import { fetchReturnAllProperties } from "@/features/public/view/propertyThunk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toast";
import { fetchLandlordProfile } from "../../profile/landlordProfileThunk";

export const fetchRegisterHostel = createAsyncThunk(
    "hostel/fetchRegisterHostel",
    async ({location, roomNo, amount, name}, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getContract();
            const property = await contract.registerHostel(location, roomNo, amount, name);
            await property.wait();
            toast.success("Property registered successfully");
            dispatch(fetchReturnAllProperties())
            dispatch(fetchLandlordProfile())
            return true;
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.message);
        }
    }

)
