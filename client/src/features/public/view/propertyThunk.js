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
            const allProperties = await contract.returnAllProperties();
            const properties = allProperties.map((property) => ({
                propertyId: property[0].toString(),
                landlord: property[1],
                location: property[2],
                name: property[3],
                rentAmount: formatEther(property[4].toString()),
                requestedBy: property[5],
                isOccupied: property[6],
                tenantRequest: property[7],
                isRegistered: property[8]
            }));
            console.log(properties);
            dispatch(fetchLandlordProfile());
            dispatch(fetchStudentProfile());
            return properties;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
