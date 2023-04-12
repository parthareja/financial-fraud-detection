import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function DashBoard() {
  const navigate = useNavigate()
  async function logout() {
    const res = await fetch('http://localhost:8080/auth/logout', {
      credentials: 'include',
    })

    // if (res.data) {
      navigate('/signin')
    // }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default DashBoard