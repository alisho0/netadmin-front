import { Package } from 'lucide-react'
import React from 'react'

export const Dashboard = () => {
  const orders = [
    { id: 'ORD-001', school: 'Central High School', date: '5/10/2024', qty: 4, status: 'In Progress' },
    { id: 'ORD-002', school: 'North Elementary', date: '5/12/2024', qty: 2, status: 'In Progress' },
    { id: 'ORD-003', school: 'South Middle School', date: '5/8/2024', qty: 1, status: 'Completed' },
  ]

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

      <section className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Últimas Órdenes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ORDER #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SCHOOL</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ENTRY DATE</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">QTY</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">STATUS</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.school}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.qty}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
