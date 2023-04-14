import React, {useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

function DashBoard() {
  const { user, setUser } = useUser();
  const navigate = useNavigate()
  async function logout() {
    const res = await fetch('http://localhost:8080/auth/logout', {
      credentials: 'include',
    })
    setUser(undefined)
    // localStorage.setItem("user", null)
    navigate('/signin')
      }
    const testUser = {"firstName":"bruh","lastName":"yesyes","email":"yes@gmail.com"}

  return (
    <div>
      <div>
      <h1 className="text-3xl font-bold underline">Dashboard</h1>
      </div>
      <h2>Welcome {testUser.firstName}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default DashBoard