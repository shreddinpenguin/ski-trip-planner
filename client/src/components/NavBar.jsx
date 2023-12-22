import React, { useRef } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function NavBar({ handleLogout }) {

    return (
        <div>
            <header>
                <nav className=' flex align-center my-2 mx-2'>
                    <NavLink to='/' className="mx-0.5 bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit" >Home</NavLink>
                    <NavLink to='MyTrips' className="mx-0.5 bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit" >My Trips</NavLink>
                    <button className='mx-0.5 bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit"'onClick={handleLogout}><Link to="/">Logout</Link></button>
                </nav>
            </header>
        </div>
    )
}
