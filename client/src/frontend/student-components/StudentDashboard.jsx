import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReturnAllProperties } from '@/features/public/view/propertyThunk'
import Receipts from '../public/Receipts'
import { fetchStudentProfile } from '@/features/student/profile/studentProfileThunk'

export default function StudentDashboard() {
  const dispatch = useDispatch()
  const { studentProf } = useSelector((state) => state.student);
  const { address } = useSelector((state) => state.wallet);
  const { properties } = useSelector((state) => state.allProperties);

  useEffect(() => {
    dispatch(fetchStudentProfile());
    dispatch(fetchReturnAllProperties());
  }, [])
  const isBidder = properties.some(
    (property) => property?.requestedBy?.toLowerCase() == address?.toLowerCase());
  // console.log("isBidder: ", isBidder);
  console.log(studentProf)

  return (
    <div className="mt-2">
      {/* tenant profiles */}
      <div className="tenant-profiles">
        <h2 className="text-semibold text-center text-2xl mb-2">Registered Tenant's Dashboard</h2>
        <div className="flex justify-around">
          <div className="flex-col gap-2">
            {/* address */}
            <h4 className="text-center text-blue-400">User Details</h4>
          <div >
            <span className="text-amber-400 mr-2">Address:</span>
            <span className="text-lg font-bold">{studentProf?.user?.slice(0, 7)}...{studentProf?.user?.slice(-5)}</span>
          </div>
           {/* balance */}
           <div >
            <span className="text-amber-400 pr-2">Balance:</span>
            <span className="text-lg font-bold">{studentProf?.balance} ETH</span>
          </div>
           {/* address */}
           <div >
            <span className="text-amber-400 pr-2">Currently Renting:</span>
            <span className="text-lg font-bold">{studentProf?.hasActiveHostel? "✅" : "No"}</span>
            </div>
          </div>


          {/* Rental details here */}
          <div>
            {isBidder && (<Receipts/>)}
          </div>

        </div>
      </div>
      <hr />
      {/* children components */}
      <div className="flex items-center justify-center ">
      <div className=" w-lg p-2">
      <div className="text-center py-1">
        <NavLink className="mr-3" to="deposit">Deposit</NavLink>
        <NavLink className="ml-3" to="withdraw">Withdraw</NavLink>
      </div>
        <Outlet />
        </div>
        </div>
    </div>
  )
}
