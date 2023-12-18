import React, { useEffect, useState } from "react";
import MountainCard from "./MountainCard";

export default function Mountains({ mountains, user }) {
    // const [mountains, setMountains] = useState([])

    // useEffect(() => {
    //     fetch('/api/mountains')
    //     .then(res => res.json())
    //     .then(data => setMountains(data))
    //     return () => {
    //         console.log("cleanup")
    //     }
    // }, [])
    console.log(mountains)


    const resortItems = mountains.map((mountain) => <MountainCard key={mountain.id} mountain={mountain}/>)

    return (
        <>{resortItems}</>
    );
}
