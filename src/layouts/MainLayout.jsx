import React, { useState } from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from '../components/Sidebar'
import { Menu } from 'lucide-react'

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      <main className="flex-1 overflow-auto">
        <div className="md:hidden p-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center justify-center p-2 rounded-md bg-white shadow-sm"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6 text-slate-800" />
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  )
}
