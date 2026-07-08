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
    <div className="max-w-xl mx-auto mt-10 px-4">
      <section className="mb-8">
        <form onSubmit={(e) => submitForm(e)}>

          <input type="text" placeholder='Task title' 
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

          <input type="text" placeholder='Task description (optional)' 
          onChange={(e) => setDesc(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

          <button type='submit' className="bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700 transition">Create task</button>
        </form>
      </section>

      <section className="flex flex-col gap-3">
        {tasks.map((task: Task) => {
          return (
          <div key={task.id} className="border rounded p-3 flex justify-between items-center">
            <h5 className={task.completed ? 'line-through text-gray-400' : 'font-medium'}>{task.title}</h5>
            <p className="text-sm text-gray-500">{task.description}</p>

            <div>
              <button onClick={() => deleteTask(task.id)} className="text-red-600 text-sm hover:underline ml-2">Delete task</button>

              <input type="checkbox" name="switch" id={`switch-${task.id}`}
              onChange={() => completeTask(task.id, task.completed)} 
              checked={task.completed} className="w-4 h-4"/>
              <label htmlFor="switch" className="text-sm">Mark as {task.completed ? 'incomplete' : 'complete'}</label>
            </div>

          </div>
          )
        })}
      </section>
    </div>
  )
}

export default Page