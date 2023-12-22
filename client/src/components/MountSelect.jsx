import React from 'react'
import {useLoaderData, useParams, Link} from "react-router-dom"
import MDestCard from './MDestCard';


export default function MountSelect({ setTripMountain, setShowDest, showDest }) {
    const {id} = useParams();
    const mountain = useLoaderData();

    const handleClick = (e) => {
        setTripMountain(mountain)
        setShowDest(true)
    }

    if (showDest == false){
        return (
            <div className="hero min-h-screen bg-slate-500/60">
                <div className="hero-content text-center">
                    <div className="max-w-xl">
                        <h1 className="text-5xl font-bold">{mountain.name}</h1>
                        <img className="grid h-auto card bg-slate-500/60 my-10 rounded-box place-items-center" src={mountain.image} alt={mountain.name}/>
                        <h2 className="text-3xl font-bold">Ski Pass - {mountain.ski_pass}</h2>
                        <p className="text-1xl my-10">{mountain.description}</p>
                        <button className="btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit mx-2"><Link to="/mountains">Back</Link></button>
                        <button onClick={handleClick} className="btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit mx-2">Add to Trip</button>
                    </div>
                </div>
            </div>
        )
    }
    else {
        const mountDest = mountain.mountain_dest.map((destination) => <MDestCard setShowDest={setShowDest} key={destination.id} mountain_dest={destination.destination}/>)
        return(
            <div className='bg-slate-500/60'>{mountDest}</div>
        )
    }

}

export const selectedMountain = async ({params}) => {
    const { id } = params
    const response = await fetch(`/api/mountains/${id}`)
    return response.json()
}
