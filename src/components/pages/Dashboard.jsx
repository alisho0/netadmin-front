import { Package } from 'lucide-react'
import React from 'react'
import { TablaOrdenes } from '../dashboard/OrdenesProceso'

export const Dashboard = () => {

  const getStatusColor = (status) => {
    if (status === 'In Progress') return 'bg-orange-100 text-orange-600'
    if (status === 'Completed') return 'bg-green-100 text-green-600'
    return 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <p className="text-gray-600">Bienvenido al panel de control</p>

      <section>
        <div className="mt-6 p-4 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Órdenes Activas</h3>
          <h1 className="text-4xl font-bold text-gray-800">2</h1>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </section>

      {/* Tablas de ordenes */}
      <TablaOrdenes />
    </div>
  )
}
