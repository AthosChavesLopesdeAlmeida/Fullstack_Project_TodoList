'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()

  const submitForm = async (e: React.SubmitEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name, email, password})
    })
    const data = await res.json()
    localStorage.setItem('token', data.token)
    router.push('/')
  }

  return (
    <div className="max-w-sm mx-auto mt-20 px-4">
      <h3 className="text-xl font-semibold mb-4">Register user</h3>
      <form onSubmit={(e) => submitForm(e)} className="flex flex-col gap-2">
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Type your name'
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Type your email'
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Type your password'
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <button type='submit' 
        className="bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700 transition">Submit</button>
      </form>
    </div>
  )
}

export default Page