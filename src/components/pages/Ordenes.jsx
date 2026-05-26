import React, { useState, useEffect } from 'react'
import { traerOrdenes } from '../../api/OrdenesApi'

export const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        setLoading(true)
        const data = await traerOrdenes()
        setOrdenes(data)
      } catch (err) {
        setError(err.message || 'Error al cargar las órdenes')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrdenes()
  }, [])

  const getStatusColor = (status) => {
    if (status === 'In Progress' || status === 'En Progreso') return 'bg-orange-100 text-orange-600'
    if (status === 'Completed' || status === 'Completado') return 'bg-green-100 text-green-600'
    if (status === 'Pending' || status === 'Pendiente') return 'bg-yellow-100 text-yellow-600'
    return 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Órdenes</h1>
      <p className="text-gray-600">Gestiona todas las órdenes aquí</p>

      {loading && (
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Cargando órdenes...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg shadow-md">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}

      {!loading && !error && (
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-md mt-8" >
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
                {ordenes.length > 0 ? (
                  ordenes.map((o) => (
                    <tr key={o.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{o.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{o.escuela.nombre}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{o.fechaIngreso}</td>
                      <td className="px-6 py-4 text-sm text-red-700 font-semibold">{o.fechaLimite}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{o.cantLaptops}</td>
                      <td className="px-6 py-4 text-sm text-semibold">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(o.status)}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">Detalle</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No hay órdenes disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      )}
    </div>
  )
}
