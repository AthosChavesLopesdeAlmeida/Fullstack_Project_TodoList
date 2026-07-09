'use client'
import React from 'react'
import { Task } from '../types/task'
import { useRouter } from 'next/navigation'
import { apiFetch } from '../lib/fetcher'
import { useState, useEffect } from 'react'

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const router = useRouter()

  const submitForm = (e: React.SubmitEvent) => {
    e.preventDefault()
    apiFetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({title, description: desc})
    })
    setTitle('')
    setDesc('')
    fetchTasks()
  }
  
  const fetchTasks = async () => {
    const res = await apiFetch('/api/tasks', { method: 'GET' })
    const data = await res.json()
    setTasks(Array.isArray(data) ? data : [])
  }

  const deleteTask = async (id: string) => {
    await apiFetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id)) 
  }

  const completeTask = async (id: string, currentStatus: boolean) => {
    await apiFetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: !currentStatus })
    })
    fetchTasks()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    fetchTasks()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 mb-10">
      <section className="mb-8 bg-[#2b2d31] p-6 rounded-lg shadow-md border border-[#232428]">
        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm">Create task</h3>
        <form onSubmit={(e) => submitForm(e)} className='flex flex-col gap-3'>

          <input type="text" placeholder='Task title' 
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#1e1f22] border border-[#232428] rounded px-4 py-2.5 text-[#f2f3f5] placeholder-[#949ba4] focus:outline-none focus:ring-2 focus:ring-[#5865f2] transition-all"/>

          <input type="text" placeholder='Task description (optional)' 
          onChange={(e) => setDesc(e.target.value)}
          className="bg-[#1e1f22] border border-[#232428] rounded px-4 py-2.5 text-[#f2f3f5] placeholder-[#949ba4] focus:outline-none focus:ring-2 focus:ring-[#5865f2] transition-all"/>

          <button type='submit' className="bg-[#5865f2] text-white font-medium rounded-md px-4 py-2.5 hover:bg-[#4752c4] active:bg-[#3c45a5] transition-colors shadow-sm mt-1">
            Create task
          </button>
        </form>
      </section>

      <section className="flex flex-col gap-3">
        {tasks.map((task: Task) => {
          return (
          <div key={task.id} className="bg-[#2b2d31] border border-[#232428] rounded-lg p-4 flex justify-between items-center hover:bg-[#2e3035] transition-colors shadow-sm">
            <div className="flex flex-col gap-1 max-w-[70%]">
              <h5 className={task.completed ? 'line-through text-[#949ba4] opacity-60 font-medium' : 'font-semibold text-white text-base'}>
                {task.title}
              </h5>
              {task.description && (
                <p className="text-sm text-[#949ba4]">{task.description}</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-[#949ba4] hover:text-[#f2f3f5] transition-colors">
                <input type="checkbox" name="switch" id={`switch-${task.id}`}
                onChange={() => completeTask(task.id, task.completed)} 
                checked={task.completed} 
                className="w-4 h-4 rounded bg-[#1e1f22] border-[#232428] text-[#5865f2] focus:ring-[#5865f2] focus:ring-offset-0 accent-[#5865f2]"/>
                <span>{task.completed ? 'Completed' : 'Mark complete'}</span>
              </label>

              <button onClick={() => deleteTask(task.id)} className="text-[#da373c] text-sm font-medium hover:underline hover:text-[#f23f43] transition-colors">
                Delete
              </button>
            </div>
          </div>
          )
        })}
      </section>
    </div>
  )
}

export default Page