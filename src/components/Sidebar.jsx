import React from 'react'
import { useNavigate, useLocation } from 'react-router'
import { LayoutGrid, Package, Building2 } from 'lucide-react'

export const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, path: '/' },
    { id: 'ordenes', label: 'Órdenes', icon: Package, path: '/ordenes' },
    { id: 'escuelas', label: 'Escuelas', icon: Building2, path: '/escuelas' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col text-white">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">NetAdmin</h1>
        <p className="text-sm text-slate-400 mt-1">Taller</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-3">
        {menuItems.map(item => {
          const Icon = item.icon
          const active = isActive(item.path)
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 text-center">
        <p className="text-xs text-slate-500">v1.0 • Sistema de Reparación</p>
      </div>
    </div>
  )
}
