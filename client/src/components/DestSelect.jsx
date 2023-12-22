import React from 'react'
import {useLoaderData, useParams, Link} from "react-router-dom"


export default function DestSelect({ setTripDest, setShowDest }) {
    const {id} = useParams();
    const destination = useLoaderData();

    return (
        <div className="hero min-h-screen bg-slate-500/60">
            <div className="hero-content text-center">
                <div className="max-w-xl">
                    <h1 className="text-5xl font-bold">{destination.name}</h1>
                    <img className="grid h-auto card bg-slate-500/60 my-10 rounded-box place-items-center" src={destination.image} alt={destination.name}/>
                    <h2 className="text-2xl font-bold"> Address: {destination.location}</h2>
                    <p className="text-1xl my-10">{destination.description}</p>
                    <button onClick={(e)=> setShowDest(false)}className="btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit mx-2 my-10">back</button>
                    <button onClick={(e)=> setTripDest(destination)}className="btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit mx-2"><Link to='/tripsummary'>Add to Trip</Link></button>
                </div>
            </div>
        </div>
    )

}

export const selectedDest = async ({params}) => {
    const { id } = params
    const response = await fetch(`/api/destinations/${id}`)
    return response.json()
}