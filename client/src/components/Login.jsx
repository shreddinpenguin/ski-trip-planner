import React, { useEffect, useState } from "react";

export default function Login() {
//     const [name, setName] = useState('')
//     const [password, setPassword] = useState('')
//     const [user, setUser] = useState(null)

//     useEffect(() => {
//         fetch('/api/checksession')
//             .then(r => r.json())
//             .then(user => setUser(user))
//     }, [])

//     function handleSubmit(e) {
//         e.preventDefault()
//         fetch("/api/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ name: name, password: password })
//         })
//             .then(res => res.json())
//             .then(data => setUser(data))
//     }

//     function handleLogout(e) {
//         e.preventDefault()
//         fetch("/api/logout", {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         })
//         .then(setUser(null))
//     }

//     if (user) {
//         return (
//             <>
//                 <h1>Welcome, {user.name}</h1>
//                 <form onSubmit={handleSubmit}>
//                     <button onClick={handleLogout}>Logout</button>
//                 </form>
//             </>
//         )
//     }
//     else {
//         return (
//             <form onSubmit={handleSubmit}>
//                 <h2>Username</h2>
//                 <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//                 <h2>Password</h2>
//                 <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <button type="submit">Login</button>
//                 <br></br>
//                 <button onClick={handleLogout} type="submit">Logout</button>
//             </form>
//         )
//     }
}