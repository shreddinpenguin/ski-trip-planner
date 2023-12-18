import React, { useEffect, useState } from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, UNSAFE_DataRouterStateContext } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import BaseLayout from './BaseLayout'
import Login from "./Login";
import Trips from "./Trips";
import Mountains from "./Mountains";

function App() {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [mountains, setMountains] = useState([])

  useEffect(() => {
    fetch('/api/checksession')
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
  }, []);

  useEffect(() => {
    fetch('/api/mountains')
      .then((r) => {
        if (r.ok) {
          r.json().then((mount) => setMountains(mount));
        }
      });
  }, ["/api/mountains"]);

  function handleSubmit(e) {
    e.preventDefault()
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name, password: password })
    })
      .then(res => res.json())
      .then(data => setUser(data))
  }

  function handleLogout(e) {
    e.preventDefault()
    fetch("/api/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(setUser(null))
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BaseLayout />}>
        <Route path="/" index element={<Login />} />
        <Route path="Home" element={<Home />} />
        <Route path="Trips" element={<Trips />} />
        <Route path="Mountains" element={<Mountains mountains={mountains} user={user}/>} />
      </Route>
    )
  )

  if (user) {
    return (
      <>
        <h1>Welcome, {user.name}</h1>
        <form onSubmit={handleSubmit}>
          <button onClick={handleLogout}>Logout</button>
        </form>
        <div className='App'>
          <RouterProvider router={router} />
        </div>
      </>
    )
  }
  else {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Username</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <h2>Password</h2>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <br></br>
        <button onClick={handleLogout} type="submit">Logout</button>
      </form>
    )
  }

}

export default App

