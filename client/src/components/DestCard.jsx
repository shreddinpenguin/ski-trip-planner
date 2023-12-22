import React from 'react'
import { Link } from 'react-router-dom'


export default function DestCard({ dest }) {
    return (
        <div className="hero min-h-1/2 my-18">
            <div className="hero-content flex-col">
                <img src={dest.image} alt={dest.name} className="max-w-sm rounded-lg shadow-2xl my-5" />
                <div>
                    <h1 className="text-5xl font-bold my-5">{dest.name}</h1>
                    {/* <p className="py-6">{dest.description}</p> */}
                    <button className="flex btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit mx-auto my-5 self-center"><Link to={`/destinations/${dest.id}`}>Select</Link></button>
                </div>
            </div>
        </div>
    )
}