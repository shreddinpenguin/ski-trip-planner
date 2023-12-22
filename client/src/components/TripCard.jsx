import React, { useState } from 'react'

export default function TripCard({ user, trip }) {

    const handleJoin = ((e) => {
    let new_trip_user = {
        'trip_id': trip.id,
        'user_id': user.id,
    }
    console.log(new_trip_user)
    fetch('/api/trip_users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(new_trip_user)
    })
    .then(res => res.json())

    })

    return (
        <li className="text-inherit card mx-2 my-2 max-w-md bg-slate-500/60 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={trip.mountain.image} alt={trip.mountain.name} className="h-52 w-80 rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{trip.trip_name}</h2>
                <p>{trip.mountain.name}</p>
                <p>{trip.destination.name}</p>
                <p>{trip.duration} days</p>
                {/* <p>{trip.trip_users}</p> */}
                <div className="card-actions">
                    <button onClick={handleJoin} className=" w-32 btn bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-blue-700 transition duration-500 text-inherit">Join</button>
                </div>
            </div>
        </li>
    )
}
