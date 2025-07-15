const { Defender } = require('@openzeppelin/defender-sdk');
const { ethers } = require('ethers');

const ABI = [
  {
    "inputs": [],
    "name": "autoHostelPayment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = '0xb3D51cbF40171953e3D7485f16BCe6B775F7e660';

exports.handler = async function(credentials) {
  const client = new Defender(credentials);
  const signer = client.relaySigner;
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  const tx = await contract.autoHostelPayment();
  console.log('autoHostelPayment triggered:', tx.hash);
  return tx.hash;
};
