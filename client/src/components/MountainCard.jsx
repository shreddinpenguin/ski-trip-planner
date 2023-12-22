import React from 'react'
import { Link } from 'react-router-dom'

export default function MountainCard({ setTripMountain, setShowDest, mountain }) {

    const handleClick = (e) => {
        setTripMountain(mountain)
        setShowDest(true)
    }

    return (
        <div className="hero min-h-1/2 my-18">
            <div className="hero-content text-center flex-col ">
                <img src={mountain.image} alt={mountain.name} className="max-w-sm rounded-lg shadow-2xl my-5" />
                <div>
                    <h1 className="text-5xl font-bold my-5">{mountain.name} - {mountain.ski_pass}</h1>
                    {/* <p className="py-6">{mountain.description}</p> */}
                    <button className="btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit mx-auto my-5"><Link to={`/mountains/${mountain.id}`}>See More</Link></button>
                    <button onClick={handleClick} className="btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit mx-2">Add to Trip</button>
                </div>
            </div>
        </div>
    )
}
