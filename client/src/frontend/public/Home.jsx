import React from 'react'
import ConnectWallet from './ConnectWallet'
import { Link } from 'react-router-dom'
import { FaRegRegistered } from "react-icons/fa";

export default function Home() {
  return (
    <div className="p-10 min-h-screen">
      <div className="mb-3 flex justify-end items-center">
        <ConnectWallet />
      </div>

      <h1 className="font-extrabold text-4xl text-center mb-10 text-indigo-400">
         KampHostel — Decentralized Hostel Booking for Students in Uganda
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Problem */}
        <div className="bg-stone-700 p-6 rounded-2xl shadow-md">
          <h3 className="font-bold text-xl mb-3 text-red-400">🚨 Problem At Hand</h3>
          <p className="">
            Renting hostels is still largely manual and trust-based. Students face challenges
            like unclear rental terms, lack of transparency, and delays in confirming a room.
            Hostel owners struggle with managing requests and rent payments efficiently.
          </p>
        </div>

        {/* Solution */}
        <div className="bg-stone-700 p-6 rounded-2xl shadow-md ">
          <h3 className="font-bold text-xl mb-3 text-green-600">✅ Solution</h3>
          <ul className="list-disc list-inside space-y-2 ">
            <li>All users register as either a Hostel Landlord or Student.</li>
            <li>Landlords register hostels, specify location, rooms, rent.</li>
            <li>Students make requests for hostels they're interested in.</li>
            <li>Landlords sign rental receipts to start the agreement.</li>
            <li>Rent is auto-deducted when the renting period starts.</li>
          </ul>
        </div>

        {/* How It Works */}
        <div className="bg-stone-700 p-6 rounded-2xl shadow-md ">
          <h3 className="font-bold text-xl mb-3 text-blue-400">⚙️ How It Works</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Register as student or landlord.</li>
            <li>Landlord registers hostel with rent + duration.</li>
            <li>Student makes a rental request for available hostel.</li>
            <li>Landlord signs the request → rental begins.</li>
            <li>Contract automates rent payment and resets expired rentals.</li>
          </ol>
        </div>

        {/* Registration CTA */}
        <div className="bg-stone-700 p-6 rounded-2xl shadow-md ">
          <h3 className="font-bold text-xl mb-3 text-purple-400">📝 Registration</h3>
          <p className="mb-4">
            New to KampHostel? Choose your role and register to get started as a hostel landlord or student.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm">Not registered yet?</span>
            <Link to="/register" className="flex items-center text-amber-500 font-semibold hover:underline">
              <span>Register here</span>
              <FaRegRegistered className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
