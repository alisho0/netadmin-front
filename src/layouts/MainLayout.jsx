import React from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from '../components/Sidebar'

export const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
