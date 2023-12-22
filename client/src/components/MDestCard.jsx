import React from 'react'
import { Link } from 'react-router-dom'


export default function MDestCard({ setShowDest, mountain_dest }) {
    return (
        <div className="hero min-h-1/2 my-18">
            <div className="hero-content text-center flex-col">
                <img src={mountain_dest.image} alt={mountain_dest.name} className="max-w-sm rounded-lg shadow-2xl my-5" />
                <div>
                    <h1 className="text-5xl font-bold my-5">{mountain_dest.name}</h1>
                    {/* <p className="py-6">{dest.description}</p> */}
                    <button onClick={(e) => setShowDest(false)} className="btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit mx-auto">Back</button>
                    <button className="btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit mx-2 my-5"><Link to={`/destinations/${mountain_dest.id}`}>Select</Link></button>
                </div>
            </div>
        </div>
    )
}