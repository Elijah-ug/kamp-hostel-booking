import { getContract } from "@/assets/contract";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReceiptThunk = createAsyncThunk(
    "receipt/fetchReceiptThunk",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            const receipts = await contract.returnHostelReceipt();
            const userReceipt = {
                hostelId: receipts[0].toString(),
                startDate: new Date(Number(receipts[1]) * 1000).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }),
                endDate: new Date(Number(receipts[2]) * 1000).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }),
                roomNo: receipts[3].toString(),
                owner: receipts[4],
                student: receipts[5],
                isSigned: receipts[6],
                isPaid: receipts[7],
                propertyName: receipts[8],
            }
            console.log(userReceipt);
            return userReceipt;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
