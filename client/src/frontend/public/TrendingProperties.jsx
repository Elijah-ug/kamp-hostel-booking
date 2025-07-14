import { Button } from "@/components/ui/button";
import {fetchReturnAllProperties} from "../../features/public/view/propertyThunk"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchHostelRentRequest } from "@/features/student/request/rentRequestThunk";

export const TrendingProperties = () => {
  const { properties } = useSelector((state) => state.allProperties);
  const { studentProf } = useSelector((state) => state.student);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchReturnAllProperties());
    console.log(properties);
  }, [])

  const handleSendRentRequest = (propertyId) => {
    const parsedProp = propertyId.toString();
    console.log(typeof (propertyId))
    console.log(typeof(parsedProp))

    if (!studentProf.isRegistered) {
      toast.error("You're not a registered tenant");
    } else if (properties.tenantRequest) {
      toast.error("Property has been booked");
    } else {
      dispatch(fetchHostelRentRequest({propertyId}))
      console.log("Request sent to the contract");
    }
  }

  return (
    <div>
      <div className="my-4 mx-10">
         <div className="grid grid-cols-3 gap-4">
          {
            properties?.map((property, index) => (
          <div key={index} className="bg-gray-500 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all">
            <h2 className="text-lg font-semibold mb-2">Property #{property?.propertyId}</h2>
              <p className="flex gap-2">
                <strong>Landlord:</strong>
                <span>{property?.landlord?.slice(0, 6)}...{property?.landlord?.slice(-4)}</span>
              </p>

              <p className="flex gap-2"><strong>Location:</strong> <span>{property?.name}</span></p>
              <p className="flex gap-2"><strong>Location:</strong> <span>{property?.location}</span></p>
            <p className="flex gap-2"><strong>Rent:</strong> <span>{property?.rentAmount} ETH</span> </p>
            <p className="flex gap-2">
              <strong>Status:</strong>{" "}
              <span className={property?.tenantRequest ? "text-red-400" : "text-green-400"}>
                <span>{property?.tenantRequest ? "Booked" : "Available"}</span>
              </span>
              </p>
              { property.tenantRequest &&(
                <p className="flex gap-2">
                <strong >Bidder:</strong>
                <span>{property?.requestedBy.slice(0, 7)}...{property?.requestedBy.slice(-5)}</span>
                </p>)
              }
              <Button onClick={() => handleSendRentRequest(property.propertyId)}
                type="submit" className="w-1/2 mt-3">
                Send Rent Request
              </Button>
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
