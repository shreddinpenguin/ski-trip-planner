import React from 'react'

export default function MountainCard({mountain}) {
    return (
        <div id="cards" className="card card-side bg-base-100 shadow-xl mx-2 my-3" >
            <figure>
                <img
                    className="height: 1rem; width: 1rem;"
                    src={mountain.image}
                    alt={mountain.name}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{mountain.name}</h2>
                <p>{mountain.description}</p>
                <p>{mountain.ski_pass}</p>
                <div className="card-actions justify-end">
                    <button
                        // onClick={}
                        className="bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-red-600 transition duration-500 text-gray-400">
                        Select
                    </button>
                </div>
            </div>
        </div>
    )
}
