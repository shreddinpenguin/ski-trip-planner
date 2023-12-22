import React, { useEffect, useState } from "react";
import { useNavigate, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, UNSAFE_DataRouterStateContext } from "react-router-dom";
import Home from "./Home";
import BaseLayout from './BaseLayout'
import Mountains from "./Mountains";
import Destinations from "./DEstinations";
import MountSelect, { selectedMountain } from "./MountSelect";
import DestSelect, {selectedDest} from "./DestSelect";
import NewTrip from "./NewTrip";
import TripSummary from "./TripSummary";
import Join from "./Join";
import MyTrips from "./MyTrips";

function App() {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [sign, setSign] = useState(true)
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [pass, setPass] = useState('')
  const [tripName, setTripName] = useState('')
  const [isPublic, setIsPublic] = useState('')
  const [days, setDays] = useState('')
  const [tripMountain, setTripMountain] = useState('')
  const [showDest, setShowDest] = useState(false)
  const [tripDest, setTripDest] = useState('')
  

  useEffect(() => {
    fetch('/api/checksession')
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
  }, []);

  function handleSignup(e) {
    e.preventDefault()
    let new_user = {
      'name': newName,
      'ski_pass': pass,
      'password': newPassword,
    }
    if (pass == 'None'){
      alert('pass selection is required')
    }
    else{
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(new_user)
      })
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setNewPassword('')
        setNewName('')
        setPass('None')
        setSign(true)
      })
    }
  }

  function handleLogin(e) {
    e.preventDefault()
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name, password: password })
    })
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setName('')
        setPassword('')
        setSign(true)
      })
  }

  function handleLogout(e) {
    e.preventDefault()
    fetch("/api/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(()=> {
        setUser(null)
      })
      
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BaseLayout handleLogout={handleLogout}/>}>
        <Route path="/" index element={<Home user={user}/>} />
        <Route path="NewTrip" element={<NewTrip tripName={tripName} setTripName={setTripName} isPublic={isPublic} setIsPublic={setIsPublic} days={days} setDays={setDays}/>} />
        <Route path="Mountains" element={<Mountains tripMountain={tripMountain} setShowDest={setShowDest} showDest={showDest} setTripMountain={setTripMountain}/>} />
        <Route path="Destinations" element={<Destinations />} />
        <Route path="Join" element={<Join user={user} />} />
        <Route path="MyTrips" element={<MyTrips user={user} />} />
        <Route path="/mountains/:id" element={<MountSelect setShowDest={setShowDest} showDest={showDest} setTripMountain={setTripMountain}/>} loader={selectedMountain}/>
        <Route path="/destinations/:id" element={<DestSelect setTripDest={setTripDest} setShowDest={setShowDest}/>} loader={selectedDest}/>
        <Route path="TripSummary" element={<TripSummary user={user} setDays={setDays} setTripDest={setTripDest} setTripName={setTripName} tripName={tripName} tripDest={tripDest} tripMountain={tripMountain} setTripMountain={setTripMountain} days={days} setIsPublic={setIsPublic} isPublic={isPublic}/>} />
      </Route>
    )
  )

  if (user) {
    return (
      <>
        <h1 className='text-6xl font-bold bg-inherit'>Ski Colorado</h1>
        <form onSubmit={handleLogin}>
        </form>
        <div className='App'>
          <RouterProvider router={router} />
        </div>
      </>
    )
  }
  else {
    if (sign) {
      return (
        <div className="hero min-h-screen bg-base-200" style={{backgroundImage: 'url(https://content.r9cdn.net/rimg/dimg/e9/95/767c2342-city-42532-166f4805a8e.jpg?width=1200&height=630&xhint=1467&yhint=1086&crop=true)'}}>
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login to start planning your ski trip today!</h1>
              {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
                  {/* <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label> */}
                </div>
                <div className="form-control mt-6">
                  <button type='submit' className="btn text-current bg-blue-700 my-2" onClick={(e)=> setSign(true)}>Login</button>
                  <button type='submit' className="btn text-current bg-blue-700 my-2" onClick={(e)=> setSign(false)}>Signup</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="hero min-h-screen bg-base-200" style={{backgroundImage: 'url(https://content.r9cdn.net/rimg/dimg/e9/95/767c2342-city-42532-166f4805a8e.jpg?width=1200&height=630&xhint=1467&yhint=1086&crop=true)'}}>
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login to start planning your ski trip today!</h1>
              {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSignup} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Ski Pass</span>
                  </label>
                  <select onChange={(e)=> setPass(e.target.value)}className="input input-bordered" >
                    <option value="None">Please Select Pass</option>
                    <option value="No Pass">No Pass</option>
                    <option value="Epic">Epic Pass</option>
                    <option value="Ikon">Ikon Pass</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                  <button type='submit' className="btn text-current bg-blue-700 my-2" onClick={(e)=> setSign(true)}>Return to Login</button>
                  <button type='submit' className="btn text-current bg-blue-700 my-2" onClick={(e)=> setSign(false)}>Signup</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }

}

export default App

