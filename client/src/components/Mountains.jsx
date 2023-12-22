import React, { useEffect, useState } from "react";
import MountainCard from "./MountainCard";
import MDestCard from "./MDestCard";

export default function Mountains({ tripMountain, setShowDest, showDest, setTripMountain }) {
    const [mountains, setMountains] = useState([])

    useEffect(() => {
        fetch('/api/mountains')
        .then(res => res.json())
        .then(data => setMountains(data))
    }, [])

    const resortItems = mountains.map((mountain) => <MountainCard setTripMountain={setTripMountain} setShowDest={setShowDest} key={mountain.id} mountain={mountain} />)

    if (!showDest){
        return (
            <div className='bg-slate-500/60'>{resortItems}</div>
        );
    }
    else {
        const mountDest = tripMountain.mountain_dest.map((destination) => <MDestCard setShowDest={setShowDest} key={destination.id} mountain_dest={destination.destination}/>)
        console.log(mountDest)
        return(
            <div className='bg-slate-500/60'>{mountDest}</div>
        )
    }
}
