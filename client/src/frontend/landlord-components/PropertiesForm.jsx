import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { fetchRegisterHostel } from '@/features/landlord/assets/register/registerHostelThunk';
import { fetchLandlordProfile } from '@/features/landlord/profile/landlordProfileThunk';
import { Label } from '@radix-ui/react-label'
import { parseEther, parseUnits } from 'ethers';
import  { useEffect, useState } from 'react'
import { MdArrowBack } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function PropertiesForm() {
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState("");
  const [amount, setAmount] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLandlordProfile());
  }, [])
  // register property
  const handleRegisterProperty = () => {
    if (!amount || isNaN(amount)) {
      console.log("Invalid Amount");
      return;
    }
    try {
      const parsedAmount = parseEther(amount);
      dispatch(fetchRegisterHostel({ location, rooms, amount: parsedAmount }));
      console.log(typeof(parsedAmount));
      setAmount("");
      setLocation("");
      setName("");
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
            id="location" placeholder="Ex: Kira Rd" />

         <Label htmlFor="propertyName">Property Name</Label>
          <Input value={rooms} onChange={(e) => setRooms(e.target.value)}
            type="number" id="propertyName" placeholder="Ex: Kireka Villas" />

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
