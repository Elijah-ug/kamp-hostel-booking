import { Button } from "@/components/ui/button";
import {fetchReturnAllProperties} from "../../features/public/view/propertyThunk"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchHostelRentRequest } from "@/features/student/request/rentRequestThunk";
import { fetchAutoHostelPayment } from "@/features/student/payment/hostelPaymentThunk";

export const TrendingProperties = () => {
  const { properties } = useSelector((state) => state.allProperties);
  const { studentProf } = useSelector((state) => state.student);
  const {userReceipt} = useSelector((state) => state.receipt)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchReturnAllProperties());
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

  const isBidder = properties?.filter((property) => property.requestedBy.toLowerCase());
      console.log("userReceipt: ", userReceipt)
  let requested;
  let paid;
      for (let i = 0; i < isBidder.length; i++){
        requested = isBidder[i].isRequested;
        // paid = isBidder[i].isPaid;
      }
      console.log("userReceipt?.isPaid: ", userReceipt?.isPaid)


  return (
    <div>
      <div className="my-4 mx-10">
         <div className="grid grid-cols-3 gap-4">
          {
            properties?.map((property, index) => (
          <div key={index} className="bg-gray-500 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all">
            <h2 className="text-lg font-semibold mb-2">Property #{property?.hostelId}</h2>
              <p className="flex gap-2">
                <strong>Landlord:</strong>
                <span>{property?.owner?.slice(0, 6)}...{property?.owner?.slice(-4)}</span>
              </p>

              <p className="flex gap-2"><strong>Location:</strong> <span>{property?.location}</span></p>
                <p className="flex gap-2"><strong>Hostel:</strong> <span>{property?.hostelName}</span></p>
                <p className="flex gap-2"><strong>Room No:</strong> <span>{property?.roomNo}</span></p>
            <p className="flex gap-2"><strong>Rent:</strong> <span>{property?.rentAmount} ETH</span> </p>
            <p className="flex gap-2">
              <strong>Status:</strong>{" "}
              <span className={property?.isRequested ? "text-red-400" : "text-green-400"}>
                <span>{ userReceipt?.isPaid ? "Paid" : property?.isRequested ? "Booked" :  "Available"}</span>
              </span>
              </p>
              { property.tenantRequest &&(
                <p className="flex gap-2">
                <strong >Bidder:</strong>
                <span>{property?.requestedBy.slice(0, 7)}...{property?.requestedBy.slice(-5)}</span>
                </p>)
              }
                <div className="flex">
                  {requested ?
                    ( <Button disabled={userReceipt.isPaid} onClick={() => handleHostelPayment(property.hostelId)}
                    type="submit" className=" mt-3">
                    {userReceipt?.isPaid ?("You've already Paid"): ("Clear Payment")}
                  </Button>):
                    (
                    <Button onClick={() => handleSendRentRequest(property.hostelId)}
                    type="submit" className=" mt-3">
                    Send Rent Request
                    </Button>)
                   }

              </div>
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
