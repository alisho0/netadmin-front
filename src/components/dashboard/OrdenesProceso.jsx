import React, { useState } from 'react'

export const TablaOrdenes = ({ ordenesReparando, ordenesCompletadas }) => {
  const [filtro, setFiltro] = useState('reparando')

  const datos = filtro === 'reparando' ? ordenesReparando : ordenesCompletadas

  const getStatusColor = (estado) => {
    if (estado === 'REPARANDO') return 'bg-orange-100 text-orange-600'
    if (estado === 'COMPLETADO') return 'bg-green-100 text-green-600'
    return 'bg-gray-100 text-gray-600'
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES')
  }

  return (
    <>
      <section className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Órdenes</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setFiltro('reparando')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === 'reparando'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Reparando
            </button>
            <button
              onClick={() => setFiltro('completado')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === 'completado'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Completado
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">ESCUELA</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">FECHA DE INGRESO</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">FECHA LÍMITE</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">CANTIDAD</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">ESTADO</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {datos && datos.length > 0 ? (
                datos.map((orden) => (
                  <tr key={orden.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{orden.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{orden.escuela.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{formatDate(orden.fechaIngreso)}</td>
                    <td className="px-6 py-4 text-sm text-red-700 font-semibold">{formatDate(orden.fechaLimite)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{orden.cantLaptops}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orden.estado)}`}>
                        {orden.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">Detalle</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No hay órdenes disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
