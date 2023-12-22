import React, { useState, useEffect } from 'react'
import TripCard from './TripCard'

export default function Join({ user }) {
    const [trips, setTrips] = useState([])
    // const [tripId, setTripId] = useState('')

    useEffect(() => {
        fetch('/api/trips')
        .then(res => res.json())
        .then(data => setTrips(data))
    }, [])

    const pubTrips = trips.filter(trip => trip.public == 'true')

    const tripItems = pubTrips.map((trip) => <TripCard key={trip.id} trip={trip} user={user}/>)

    return (
        <ul className='mx-auto flex flex-wrap justify-center col-auto cards'>{tripItems}</ul>
    )
}
