import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NewTrip({ tripName, setTripName, isPublic, setIsPublic, days, setDays }) {
  const navigate = useNavigate()
  
  const handleClick = () => {
    if (isPublic == ''){
      alert('Please Select Public or Private')
    }
    else {
      navigate('/mountains')
    }
  }

  return (
    <div className="mx-auto my-20 card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Trip Name</span>
          </label>
          <input type="text" value={tripName} onChange={(e) => setTripName(e.target.value)} placeholder=" trip name" className="input input-bordered" required />
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
          <select defaultValue={''} onChange={(e)=> setIsPublic(e.target.value)}className="input input-bordered" >
            <option value=''>Select</option>
            <option value="false">Private Trip</option>
            <option value="true">Public Trip</option>
          </select>
        </div>
        <div className="form-control mt-6">
          <button onClick={handleClick}type='submit' className="btn text-current bg-blue-700 my-2">View Mountains</button>
        </div>
      </form>
    </div>
  )
}
