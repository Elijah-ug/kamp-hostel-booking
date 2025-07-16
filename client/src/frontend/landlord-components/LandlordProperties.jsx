import { Button } from "@/components/ui/button";
import {fetchReturnAllProperties} from "../../features/public/view/propertyThunk"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Receipts from "../public/Receipts";

export const LandlordProperties = () => {
  const { properties } = useSelector((state) => state.allProperties);
  const { studentProf } = useSelector((state) => state.student);
  const { address } = useSelector((state) => state.wallet);
  const { userReceipt } = useSelector((state) => state.receipt);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchReturnAllProperties());
    console.log(address);
  }, [])

  const isOwner = properties.some(
    (property) => property?.owner?.toLowerCase() === address?.toLowerCase());
  console.log("userReceipt.propertyId: ", isOwner)

  return (
    <div className="my-4 mx-10">
    <div className="grid grid-cols-1 gap-4">
      {isOwner ? (
        properties?.map((property, index) => (
          <div
            key={index}
            className="flex justify-center gap-4 rounded bg-gray-800 p-4 hover:shadow-xl transition-all"
          >
            {/* Property Card */}
            <div className="w-1/2 bg-gray-600 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Property #{property?.hostelId}</h2>
              <p className="flex gap-2">
                <strong>Owner:</strong>
                <span>{property?.owner?.slice(0, 6)}...{property?.owner?.slice(-4)}</span>
              </p>
              <p className="flex gap-2"><strong>Location:</strong> <span>{property?.location}</span></p>
              <p className="flex gap-2"><strong>Hostel:</strong> <span>{property?.hostelName}</span></p>
              <p className="flex gap-2"><strong>Room No:</strong> <span>{property?.roomNo}</span></p>
              <p className="flex gap-2"><strong>Rent:</strong> <span>{property?.rentAmount} CELO</span> </p>
              <p className="flex gap-2">
                <strong>Status:</strong>
                <span className={property?.isRequested ? "text-red-400" : "text-green-400"}>
                  {property?.isRequested ? "Booked" : "Available"}
                </span>
              </p>
              {property.tenantRequest && (
                <p className="flex gap-2">
                  <strong>Bidder:</strong>
                  <span>{property?.requestedBy?.slice(0, 6)}...{property?.requestedBy?.slice(-4)}</span>
                </p>
              )}
              <Link to="/sign" className="font-bold text-green-400 underline mt-2 block">
                Sign the receipt
              </Link>
            </div>

            {/* Receipt */}
            {isOwner && property.hostelId === userReceipt.hostelId? (
              <div className="w-1/2 bg-gray-600 p-4 rounded-lg">
                <Receipts />
              </div>) : (<p
                className="w-1/2 bg-gray-600 text-lg flex items-center justify-center ">
                No receipt yet</p>)
            }
          </div>
        ))
      ) : (
        <h3 className="text-xl">You have no properties yet</h3>
      )}
    </div>

    {/* Back link */}
    <div className="p-2">
      <Link to="/landlord-dashboard" className="font-bold flex items-center gap-1">
        <MdArrowBack size={20} />
        <span>Back</span>
      </Link>
    </div>
  </div>

  )
}
