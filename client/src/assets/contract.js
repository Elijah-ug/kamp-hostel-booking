import { ethers } from "ethers"
import contractABI from "../abi/KampHostel.json"
import { contractAddress } from "@/config";

const getProvider = () => {
    if (window.ethereum) {
        return new ethers.BrowserProvider(window.ethereum);
    } else {
        throw new Error("Metamask is not installed")
    }
}
const getSigner = async () => {
    const provider = getProvider()
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner()
}
const getContract = async () => {
    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
        console.log(contract.target);
        return contract;
    } catch (error) {
        console.log(error.message)
        return;
    }
}
export {getProvider, getSigner, getContract}
