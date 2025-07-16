import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Link } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { fetchRegisterLandlord } from '@/features/landlord/auth/registerLandlordThunk'
import { fetchRegisterStudent } from '@/features/student/auth/registerStudentThunk'

export default function Registeration() {

  const dispatch = useDispatch();
  const handleRegisterLandlord = () => {
    dispatch(fetchRegisterLandlord())
  }
  const handleRegisterTenant = () => {
    dispatch(fetchRegisterStudent())
  }
  return (
      <div>
          <div className="mx-10 my-6">
              <p className="text-center mb-4">Registration Guidelines</p>
              <div className="flex justify-center gap-8">
                  {/* landlord */}
                  <Card className="w-full max-w-sm">
                  <CardHeader>
                  <CardTitle>Hostel Owner's Guide</CardTitle>
                  <CardDescription>
                  This' a simple guide for Hostel Landlord Registration
                </CardDescription>
              </CardHeader>
                      <CardContent>
                          <p>By clicking the register button below, you will be recognised
                              as one of the Hostel Owners on the platform. There after you'll
                             move on to add your rental Hostels, Hostel Name, Location and
                             rent price for Students to rent. </p>
                     </CardContent>
              <CardFooter className="flex-col gap-2">
              <Button onClick={handleRegisterLandlord}
                type="submit" className="w-full">Register Here As Landlord</Button>
              </CardFooter>
                  </Card>
                  {/* tenant */}
                  <Card className="w-full max-w-sm">
                  <CardHeader>
                  <CardTitle>Student Guide</CardTitle>
                  <CardDescription>
                  This' a simple guide for Student Registration
                </CardDescription>
              </CardHeader>
                      <CardContent>
                          <p>By clicking the register button below, you will be recognised
                              as one of the Students on the platform. This will give you an opportunity
                              to navigate through the available Hostels and prices, which will further
                              guide you to make the best choice.</p>
                      </CardContent>
              <CardFooter className="flex-col gap-2">
              <Button onClick={handleRegisterTenant}
                type="submit" className="w-full">Register As A Student</Button>
              </CardFooter>
    </Card>
              </div>
      </div>
      <div className="p-2 absolute left-20 bottom-20">
          <Link to="/"
                  className="font-bold flex items-center gap-1" >
                  <MdArrowBack size={20} />
                  <span>back</span>
            </Link>
          </div>
    </div>
  )
}
