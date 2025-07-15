import { getContract } from "@/assets/contract";
import { fetchLandlordProfile } from "@/features/landlord/profile/landlordProfileThunk";
import { fetchStudentProfile } from "@/features/student/profile/studentProfileThunk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatEther } from "ethers";

export const fetchReturnAllProperties = createAsyncThunk(
    "allProperties/fetchListedProperties",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getContract();
            const allProperties = await contract.returnAllHostels();
            const properties = allProperties.map((property) => ({
                hostelId: property[0].toString(),
                owner: property[1],
                location: property[2],
                roomNo: property[3].toString(),
                rentAmount: formatEther(property[4].toString()),
                requestedBy: property[5],
                isRegistered: property[6],
                isRequested: property[7],
                isOccupied: property[8],
                hostelName: property[9]
            }));
            // console.log(properties);
            dispatch(fetchLandlordProfile());
            dispatch(fetchStudentProfile());
            return properties;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
