import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home({ user }) {

  return (

    <div className="items-center mx-auto">
      <h1 className='text-5xl font-bold text-inherit'>Welcome, {user.name}!</h1>
      <div className='flex my-4 mx-2'>
        <Link to='/newtrip'><div className="btn mx-2 grid w-72 h-64 bg-[#1a1a1a]/50 p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700/70 transition duration-500 text-3xl font-bold text-inherit  place-content-center">New Trip</div></Link>
        <Link to='/mytrips'><div className="btn mx-2 grid w-72 h-64 bg-[#1a1a1a]/50 p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700/70 transition duration-500 text-3xl font-bold text-current place-content-center">My Trips</div></Link>
        <Link to='/join'><div className="btn mx-2 grid w-72 h-64 bg-[#1a1a1a]/50 p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700/70 transition duration-500 text-3xl font-bold text-current place-content-center">Join a Trip</div></Link>
      </div>
      <div className='flex my-4 mx-2'>
        <Link to='/mountains'><div className="btn mx-2 grid w-72 h-64 bg-[#1a1a1a]/50 p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700/70 transition duration-500 text-3xl font-bold text-current place-content-center">Browse Mountains</div></Link>
        <Link to='/destinations'><div className="btn mx-2 grid w-72 h-64 bg-[#1a1a1a]/50 p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700/70 transition duration-500 text-3xl font-bold text-current place-content-center">Browse Hotels</div></Link>
      </div>
    </div>
  )
}
