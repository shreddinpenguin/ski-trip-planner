import React, { useState, useEffect } from 'react'
import MyTripCard from './MyTripCard'

export default function MyTrips({ user }) {
    const [trips, setTrips] = useState([])

    useEffect(() => {
        fetch('/api/trip_users')
        .then(res => res.json())
        .then(data => setTrips(data))
    }, [])
    console.log(trips)
    const myTrips = trips.filter(trip => trip.users.name = user.name)
    console.log(myTrips)

    const tripItems = myTrips.map((trip) => <MyTripCard key={trip.id} trip={trip} setTrips={setTrips}/>)

    if (myTrips){
        return (
            <ul className='mx-auto flex flex-wrap justify-center col-auto cards'>{tripItems}</ul>
        )
    }
    else {
        return (
            <h1>Create or join a trip to view your trips</h1>
        )
    }
}