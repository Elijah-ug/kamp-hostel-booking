import { getContract } from "@/assets/contract";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatEther } from "ethers";

export const fetchStudentProfile = createAsyncThunk(
    "student/fetchStudentProfile",
    async (_, {rejectWithValue}) => {
        try {
            const contract = await getContract();
            // console.log(contract)
            const tx = await contract.returnStudentProfile();

            const studentProf = {
                balance: formatEther(tx[0].toString()),
                user: tx[1],
                hasActiveHostel: tx[2],
                isRegistered: tx[3]
            }
            console.log("studentProf: ", studentProf);
            return studentProf;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
