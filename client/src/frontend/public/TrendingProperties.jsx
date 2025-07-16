import { Button } from "@/components/ui/button";
import {fetchReturnAllProperties} from "../../features/public/view/propertyThunk"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchHostelRentRequest } from "@/features/student/request/rentRequestThunk";
import { fetchAutoHostelPayment } from "@/features/student/payment/hostelPaymentThunk";
import { fetchReceiptThunk } from "@/features/public/receipts/receiptThunk";

export const TrendingProperties = () => {
  const { properties } = useSelector((state) => state.allProperties);
  const { studentProf } = useSelector((state) => state.student);
  const { userReceipt } = useSelector((state) => state.receipt)
  const { address } = useSelector((state) => state.wallet)
  const { profile } = useSelector((state) => state.landlord);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchReturnAllProperties());
    dispatch(fetchReceiptThunk())
  }, [])
  console.log("properties: ", properties);

  const handleSendRentRequest = (hostelId) => {
    const parsedProp = hostelId.toString();
    console.log( (hostelId))
    console.log(typeof(parsedProp))

    if (!studentProf.isRegistered) {
      console.log("You're not registered")
    } else if (properties.isRequested) {
      console.log("Hostel already booksd")
    } else {
      dispatch(fetchHostelRentRequest({ hostelId: parsedProp }));
      console.log("Request sent to the contract");
    }
  }

  const handleHostelPayment = (hostelId) => {
    const parsedPropId = hostelId.toString();
    dispatch(fetchAutoHostelPayment({ hostelId: parsedPropId }));
  }

  const hostel = properties?.filter((property) => property.hostelId === userReceipt.hostelId);
  const isOwner = profile?.user?.toLowerCase() !== address?.toLowerCase();
  const isBidder = properties?.some(
    (property) => property?.requestedBy?.toLowerCase() === address.toLowerCase());

  const ownerRegisterd = userReceipt?.owner?.toLowerCase() === address?.toLowerCase();
  const studentRegisterd = userReceipt?.student?.toLowerCase() === address?.toLowerCase();
  // console.log("is hostel: ", hostel);
  console.log("is studentRegisterd: ", studentRegisterd);
  let receipt;

  console.log("is userReceipt: ", userReceipt);

  return (
    <div>
      <div className="my-4 mx-10">
         <div className="grid grid-cols-3 gap-4">
          {
            properties?.map((property, index) => (
          <div key={index} className="bg-gray-600 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all">
            <h2 className="text-lg font-semibold mb-2">Property #{property?.hostelId}</h2>
              <p className="flex gap-2">
                <strong>Landlord:</strong>
                <span>{property?.owner?.slice(0, 6)}...{property?.owner?.slice(-4)}</span>
              </p>

              <p className="flex gap-2"><strong>Location:</strong> <span>{property?.location}</span></p>
                <p className="flex gap-2"><strong>Hostel:</strong> <span>{property?.hostelName}</span></p>
                <p className="flex gap-2"><strong>Room No:</strong> <span>{property?.roomNo}</span></p>
            <p className="flex gap-2"><strong>Rent:</strong> <span>{property?.rentAmount} CELO</span> </p>
            {/* <p className="flex gap-2">
              <strong>Status:</strong>{" "}
              <span className={property?.isRequested ? "text-red-400" : "text-green-400"}>
                <span>{ receipt?.isPaid? "paid" : property?.isRequested ? "Booked" :  "Available"}</span>
              </span>
              </p> */}
                <div>
                {(() => {
                  const isCurrentReceipt = userReceipt.hostelId === property.hostelId;
                  const statusText = isCurrentReceipt
                    ? userReceipt.isPaid ? "Paid" : "Booked" : property.isRequested ? "Booked" : "Available";
                  const statusColor = statusText === "Paid" ? "text-amber-400" :
                    statusText === "Booked" ? "text-red-400" : "text-green-400";
                  return <div className="flex gap-2">
                    <strong>Status:</strong>
                    <span className={statusColor}>{ statusText}</span>
                  </div>
                })()}
                </div>
              { property.tenantRequest &&(
                <p className="flex gap-2">
                <strong >Bidder:</strong>
                <span>{property?.requestedBy.slice(0, 7)}...{property?.requestedBy.slice(-5)}</span>
                </p>)
              }
                {isOwner && (
                  <div className="flex">
                  {property?.isRequested ?
                      (isBidder && (<Button
                        disabled={property.hostelId === userReceipt?.hostelId && userReceipt?.isPaid}
                        onClick={() => handleHostelPayment(property.hostelId)}
                    type="submit" className=" mt-3">
                        { property?.hostelId === userReceipt?.hostelId && userReceipt?.isPaid ?
                          ("You've already Paid") : ("Clear Payment")}
                  </Button>)):
                    (
                    <Button onClick={() => handleSendRentRequest(property.hostelId)}
                    type="submit" className=" mt-3">
                    Send Rent Request
                    </Button>)
                    }

                    {/* {(() => {
                      const isCurrentReceipt = userReceipt.hostelId === property.hostelId;
                      const paidStatus = isCurrentReceipt
                    })()} */}
              </div>)}
              </div>
            ))
            }
        </div>
        {properties.length === 0 && (<div
          className="text-2xl flex items-center justify-center">No Hostels on the platform yet!</div>)}
</div>
    </div>
  )
}
