import { autoConnectWallet } from '@/auth/autoConnectWalletThunk';
import { fetchReceiptThunk } from '@/features/public/receipts/receiptThunk';
import { fetchReturnAllProperties } from '@/features/public/view/propertyThunk';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Receipts() {
    const { address } = useSelector((state) => state.wallet);
  const { userReceipt } = useSelector((state) => state.receipt);
  const { properties } = useSelector((state) => state.allProperties);

    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchReceiptThunk());
      dispatch(fetchReturnAllProperties());
    }, [])
    console.log("receiptuserReceipt: ", properties);
  console.log("receiptuserReceipt: ", userReceipt);

      const isBidder = properties?.filter(
        (property) => property.requestedBy.toLowerCase() ||
          property.owner.toLowerCase() === address.toLowerCase())
          console.log("is bidder: ", isBidder)
          let price;
          for (let i = 0; i < isBidder.length; i++){
            price = isBidder[i].rentAmount
          }
          console.log(price)


  return (
      <div>
      {userReceipt.isSigned &&(
        <div className="flex flex-col bg-gray-500 p-2 rounded">
                  <h4 className="text-center text-amber-500 font-bold">RECEIPT</h4>
                {/* Landlord */}
                              <div >
                    <span className="text-amber-400 pr-2 font-bold">Owner:</span>
                  <span className="text-sm">
                      {userReceipt?.owner?.slice(0, 7)}...{userReceipt?.owner?.slice(-5)}
                  </span>
              </div>
              {/* Landlord */}
              <div >
                    <span className="text-amber-400 pr-2 font-bold">Student:</span>
                    <span className="text-sm">
                    {userReceipt?.student?.slice(0, 7)}...{userReceipt?.student?.slice(-5)}
                    </span>
              </div>
              <div>
                    <span className="text-amber-400 pr-2 font-bold">PropertyId:</span>
                  <span className=" text-sm">
                      {userReceipt?.hostelId ? ("#" + Number(userReceipt.hostelId)) : "N/A"}</span>
                  </div>
                  {/* address */}
                  <div >
                    <span className="text-amber-400 pr-2 font-bold">Rent Price:</span>
                    <span className="text-sm">{price}ETH</span>
                    </div>
                    {/* rntal payment status */}
                  <div >
                    <span className="text-amber-400 pr-2 font-bold">Rental Paid:</span>
                    <span className="text-sm"> {userReceipt.isPaid? "✅" : "Unpaid"}</span>
                    </div>

                    {/* start date */}
                  <div >
                    <span className="text-amber-400 pr-2 font-bold">Start Date:</span>
                    <span className="text-sm">{userReceipt.startDate}</span>
                    </div>
                    {/* end date */}
                  <div >
                    <span className="text-amber-400 pr-2 font-bold">End Date:</span>
                    <span className="text-sm">{userReceipt.endDate}</span>
              </div>
              {/* signed */}
              <div >
                    <span className="text-amber-400 pr-2 font-bold">Signed:</span>
                    <span className="text-sm">{userReceipt.isSigned? "✅": "Unsigned"}</span>
              </div>
              </div>)}
    </div>
  )
}
