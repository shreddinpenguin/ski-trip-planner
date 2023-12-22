import React, { useEffect, useState } from "react";
import DestCard from "./DestCard";

export default function Destinations() {
    const [dests, setDests] = useState([])

    useEffect(() => {
        fetch('/api/destinations')
        .then(res => res.json())
        .then(data => setDests(data))
        return () => {
            console.log("cleanup")
        }
    }, [])
    console.log(dests)

    const destItems = dests.map((dest) => <DestCard key={dest.id} dest={dest}/>)
    console.log(destItems)
    return (
        <div className='bg-slate-500/60'>{destItems}</div>
    );
}

