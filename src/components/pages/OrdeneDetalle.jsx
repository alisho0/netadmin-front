import React, { useState, useEffect } from 'react'
import { obtenerDetalleOrden, cambiarEstadoLaptop } from '../../api/OrdenesApi'
import { useNavigate, useParams } from 'react-router'

export const OrdeneDetalle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [orden, setOrden] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [changedStatusLaptopId, setChangedStatusLaptopId] = useState(null)

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        setLoading(true)
        const data = await obtenerDetalleOrden(id)
        setOrden(data)
      } catch (err) {
        setError(err.message || 'Error al cargar la orden')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrden()
  }, [id])

  const getStatusColor = (status) => {
    const colors = {
      'INGRESADA': 'bg-yellow-100 text-yellow-700',
      'EN_REPARACION': 'bg-orange-100 text-orange-700',
      'REPARADA': 'bg-green-100 text-green-700',
      'FALTA_REPUESTO': 'bg-red-100 text-red-700',
      'ROTA': 'bg-red-200 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusLabel = (status) => {
    const labels = {
      'INGRESADA': 'Ingresada',
      'EN_REPARACION': 'En Reparación',
      'REPARADA': 'Reparada',
      'FALTA_REPUESTO': 'Falta Repuesto',
      'ROTA': 'Rota'
    }
    return labels[status] || status
  }

  const handleStatusChange = async (laptopId, newStatus) => {
    try {
      setChangedStatusLaptopId(laptopId)
      await cambiarEstadoLaptop(id, laptopId, newStatus)
      
      setOrden(prev => ({
        ...prev,
        laptops: prev.laptops.map(laptop =>
          laptop.id === laptopId
            ? { ...laptop, estado: newStatus }
            : laptop
        )
      }))

      setChangedStatusLaptopId(null)
    } catch (err) {
      alert('Error al cambiar estado: ' + err.message)
      setChangedStatusLaptopId(null)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Cargando orden...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-md">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    )
  }

  if (!orden) {
    return (
      <div className="p-8">
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-md">
          <p className="text-yellow-600">No se encontró la orden</p>
        </div>
      </div>
    )
  }

  const totalLaptops = orden.laptops.length

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <button
        onClick={() => navigate('/ordenes')}
        className="text-blue-600 hover:text-blue-800 font-medium mb-6 flex items-center gap-2"
      >
        <span>←</span> Volver a Órdenes
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">ORD-{String(orden.numeroOrden).padStart(3, '0')}</h1>
        <p className="text-gray-600">Gestiona los laptops en esta orden</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold">ESCUELA</p>
          <p className="text-xl font-bold text-gray-900">{orden.escuela}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold">FECHA DE INGRESO</p>
          <p className="text-xl font-bold text-gray-900">{orden.fechaIngreso}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold">FECHA LÍMITE</p>
          <p className="text-xl font-bold text-red-600">{orden.fechaLimite}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold">ESTADO GENERAL</p>
          <p className="text-xl font-bold text-gray-900">{totalLaptops} laptops</p>
        </div>
      </div>

      {/* Laptops Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Laptops ({totalLaptops})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">POSICIÓN</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">CÓDIGO DE BARRA</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ESTADO</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">PROBLEMA</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {orden.laptops.map((laptop) => (
                <tr
                  key={laptop.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {laptop.posicionEnOrden}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-700">
                    {laptop.codigoBarra || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={laptop.estado}
                      onChange={(e) => handleStatusChange(laptop.id, e.target.value)}
                      disabled={changedStatusLaptopId === laptop.id}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <option value="INGRESADA">Ingresada</option>
                      <option value="EN_REPARACION">En Reparación</option>
                      <option value="REPARADA">Reparada</option>
                      <option value="FALTA_REPUESTO">Falta Repuesto</option>
                      <option value="ROTA">Rota</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {laptop.descripcionProblema || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => navigate(`/ordenes/${id}/laptops/${laptop.id}`)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
