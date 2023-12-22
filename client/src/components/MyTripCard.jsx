import React, { useEffect, useState } from 'react'

export default function TripCard({ trip, setTrips }) {
    const [tripName, setTripName] = useState('')
    const [edit, setEdit] = useState(false)

    useEffect(() => {
            setTripName(trip.trips.trip_name)
    }, [])


    const handleDelete = ((id) => {
        fetch(`/api/trips/${id}`, {
            method: "DELETE"
        })
        .then(setTrips((t)=> t?.filter(location=> location.id != id)))
    })
    
    const handlePatch = ((id) => {
        fetch(`/api/trips/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"trip_name": tripName})
        })
        .then(res => res.json())
        .then(data => setTripName(data))
        .then(setEdit(!edit))
    })
    const onEdit = ((e) => {
        setEdit(!edit)
        setTripName(e.target.value)

    })

    return (
        <li className="text-inherit card mx-2 my-2 max-w-md bg-slate-500/60 shadow-xl">
            <figure className="min-h-80 px-10 pt-10">
                <img src={trip.trips.mountain.image} alt={trip.trips.mountain.name} className="flex rounded-xl h-52 w-80" />
            </figure>
            <div className="card-body items-center text-center">
                {edit
                    ?<input onChange={(e)=> setTripName(e.target.value)} placeholder={trip.trips.trip_name} value={tripName} className= "placeholder-white border-white input input-bordered card-title bg-gray-50/0 text-white text-center" ></input>
                    :<h2 className= "card-title">{tripName}</h2>
                }
                <p>{trip.trips.mountain.name}</p>
                <p>{trip.trips.destination.name}</p>
                <p>{trip.trips.duration} days</p>
                {/* <p>{trip.trip_users}</p> */}
                <div className="card-actions">
                    <button onClick={(e)=> handleDelete(trip.id)} className=" w-32 btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit">Delete</button>
                    {edit
                        ?<button onClick={(e)=> handlePatch(trip.trip_id)}className=" w-32 btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit">Save</button>
                        :<button onClick={onEdit}className=" w-32 btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit">Edit</button>
                    }
                </div>
            </div>
        </li>
    )
}