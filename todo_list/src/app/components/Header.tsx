'use client'
import React from 'react'
import { apiFetch } from '@/lib/fetcher'
import { useRouter } from 'next/navigation'

export const Header = () => {
  const router = useRouter()

  const deleteUser = async () => {
    await apiFetch('/api/users/me', {
      method: 'DELETE'
    })
    localStorage.removeItem('token')
    router.push('/register')
  }

  const logoutFunction = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div>
      <header className="bg-[#1e1f22] border-b border-[#232428] px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold tracking-wide text-white flex items-center gap-2">
          <span className="text-[#5865f2]">✓</span> Todo List
        </h1>

        <div className="flex items-center gap-3">
          <button onClick={() => deleteUser()} 
          className="bg-[#da373c] text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-[#f23f43] active:bg-[#a1282c] transition-colors shadow-sm">Delete account</button>
          
          <button onClick={() => logoutFunction()}           
          className="bg-[#4e5058] text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-[#6d6f78] active:bg-[#80848e] transition-colors shadow-sm">Logout</button>
        </div>
      </header>
    </div>
  )
}

export default Header