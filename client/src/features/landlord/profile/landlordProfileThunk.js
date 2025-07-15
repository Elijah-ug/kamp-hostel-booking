import { getContract } from "@/assets/contract";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatEther } from "ethers";

export const fetchLandlordProfile = createAsyncThunk(
    "landlord/fetchLandlordProfile",
    async (_, {rejectWithValue}) => {
        try {
            const contract = await getContract();
            console.log(contract)
            const tx = await contract.returnHostelOwnerProfile();

            const profile = {
                balance: formatEther(tx[0].toString()),
                user: tx[1],
                isRegistered: tx[2],
                hasHostel: tx[3]
            }
            // console.log(profile);
            return profile;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
