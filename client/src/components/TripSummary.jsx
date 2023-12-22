import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function TripSummary({ user, setTripMountain, setDays, setTripDest, tripName, tripDest, tripMountain, days, isPublic, setIsPublic, setTripName }) {
    const navigate = useNavigate()
    const [tripId, setTripId] = useState('')
    console.log(user.id)

    function handleClear(){
        setTripName('')
        setTripMountain('')
        setTripDest('')
        setDays('')
        setIsPublic('')
        navigate('/')
    }

    function handlePost(e) {
        e.preventDefault()
        let new_trip = {
            'trip_name': tripName,
            'mountain_id': tripMountain.id,
            'destination_id': tripDest.id,
            'duration': days,
            'public': isPublic
        }
        // let new_trip_user = {
        //     'trip_id': tripId,
        //     'user_id': user.id,
        // }
        if (isPublic == '') {
            alert('trip privacy selection is required')
        }
        else {
            fetch("/api/trips", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(new_trip)
            })
            .then(res => res.json())
            .then(data => fetch('/api/trip_users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({trip_id: data.id, user_id: user.id,})
            }))
            .then(res => res.json())
            .then(handleClear())
            .then(alert('Your Trip Has Been Created'))
        }
    }
    return (
        <div className="mx-auto my-20 card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handlePost} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Trip Name</span>
                    </label>
                    <input type="text" value={tripName} onChange={(e) => setTripName(e.target.value)} placeholder=" trip name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Mountain</span>
                    </label>
                    <h2 placeholder="no mountain selected" className="p-2.5 input input-bordered" required>{tripMountain.name}</h2>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Lodging</span>
                    </label>
                    <h2 placeholder="no lodging selected" className="p-2.5 input input-bordered" required>{tripDest.name}</h2>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text"># of Days</span>
                    </label>
                    <input type="text" value={days} onChange={(e) => setDays(e.target.value)} placeholder="# of days" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Public?</span>
                    </label>
                    <select defaultValue={isPublic} onChange={(e)=> setIsPublic(e.target.value)}className="input input-bordered" >
                        <option value=''>Select</option>
                        <option value="false">Private Trip</option>
                        <option value="true">Public Trip</option>
                    </select>
                </div>
                <div className="form-control mt-6">
                    <button type='submit' className="btn text-current bg-blue-700 my-2">Confirm</button>
                </div>
                <div className="form-control mt-6">
                    <button onClick={handleClear} className="btn text-current bg-red-700 my-2">Cancel</button>
                </div>
            </form>
        </div>
    )
}
