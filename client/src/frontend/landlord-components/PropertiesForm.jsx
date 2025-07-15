import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { fetchRegisterHostel } from '@/features/landlord/assets/register/registerHostelThunk';
import { Label } from '@radix-ui/react-label'
import { parseEther, parseUnits } from 'ethers';
import  { useEffect, useState } from 'react'
import { MdArrowBack } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function PropertiesForm() {
  const [location, setLocation] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("")

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchLandlordProfile());
  // }, [])
  // register property
  const handleRegisterProperty = () => {
    if (!amount || isNaN(amount) || !roomNo || isNaN(roomNo) || !location || !name) {
      console.log("Invalid Input");
      return;
    }
    try {
      const parsedAmount = parseEther(amount);
      const parsedRoomNo = parseUnits(roomNo.toString(), 0)
      dispatch(fetchRegisterHostel({ location, roomNo: parsedRoomNo, amount: parsedAmount, name }));
      console.log(typeof(parsedAmount));
      setAmount("");
      setLocation("");
      setName("");
      setRoomNo("")
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <div className="flex justify-center my-10 gap-6">
  {/* Property Registration Card */}
        <div className="grid w-full max-w-sm items-center gap-3 p-4 border rounded-lg shadow">
          <h3 className="text-center font-bold text-amber-400">Property Registration</h3>

          <Label htmlFor="location">Location</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)}
            id="location" placeholder="Enter Location" />

          <Label htmlFor="location">Hostel Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)}
            id="location" placeholder="Enter Hostel Name..." />

         <Label htmlFor="propertyName">Room No.</Label>
          <Input value={roomNo} onChange={(e) => setRoomNo(e.target.value)}
            type="number" id="propertyName" placeholder="Enter Room Number" />

          <Label htmlFor="rent">Rent Amount (UGX)</Label>
           <Input value={amount} onChange={(e) => setAmount(e.target.value)}
            id="rent" type="number" placeholder="500000" />

          <Button onClick={handleRegisterProperty}
            type="submit" className="w-full">Register Property
          </Button>

          <div className="pt-2 text-center">
          <Link to="/landlord-dashboard"
            className="text-blue-400 hover:underline font-medium flex items-center justify-center gap-1">
            <MdArrowBack size={18} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
  </div>
      </div>

    </div>
  )
}
