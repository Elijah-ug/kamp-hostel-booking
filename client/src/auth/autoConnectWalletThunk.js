import { createAsyncThunk } from "@reduxjs/toolkit";

export const autoConnectWallet = createAsyncThunk(
    "autoConnect/autoConnectWallet",
    async (_, { rejectWithValue }) => {

        try {
            if (!window.ethereum) return console.log("Metamask not detected");

            const alfajoresChainId = "0xaef3";
            const network = await window.ethereum.request({ method: "eth_chainId" });
            if (network !== alfajoresChainId) {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{chainId: alfajoresChainId}]
                })
            }
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if (accounts.length === 0) {
                return rejectWithValue("Wallet not connected");
            }
            return {address: accounts[0], chainId: network}
        } catch (error) {
            console.log(error.message)
        }
    }
)
