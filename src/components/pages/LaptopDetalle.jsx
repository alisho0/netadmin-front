import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { obtenerDetalleLaptop, actualizarDetalleLaptop } from '../../api/OrdenesApi'

export const LaptopDetalle = () => {
  const { id, laptopId } = useParams()
  const navigate = useNavigate()
  const [laptop, setLaptop] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    codigoBarra: '',
    descripcionProblema: '',
    encargado: '',
    notas: ''
  })

  useEffect(() => {
    const fetchLaptop = async () => {
      try {
        setLoading(true)
        const data = await obtenerDetalleLaptop(id, laptopId)
        setLaptop(data)
        setFormData({
          codigoBarra: data.codigoBarra || '',
          descripcionProblema: data.descripcionProblema || '',
          encargado: data.encargado || '',
          notas: data.notas || ''
        })
      } catch (err) {
        setError(err.message || 'Error al cargar el laptop')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLaptop()
  }, [id, laptopId])

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      await actualizarDetalleLaptop(id, laptopId, formData)
      setLaptop(prev => ({
        ...prev,
        ...formData
      }))
      setIsEditing(false)
    } catch (err) {
      alert('Error al guardar los cambios: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      codigoBarra: laptop.codigoBarra || '',
      descripcionProblema: laptop.descripcionProblema || '',
      encargado: laptop.encargado || '',
      notas: laptop.notas || ''
    })
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Cargando laptop...</p>
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

  if (!laptop) {
    return (
      <div className="p-8">
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-md">
          <p className="text-yellow-600">No se encontró el laptop</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <button
        onClick={() => navigate(`/ordenes/${id}`)}
        className="text-blue-600 hover:text-blue-800 font-medium mb-6 flex items-center gap-2"
      >
        <span>←</span> Volver a Orden
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Laptop {laptop.posicionEnOrden}</h1>
        <p className="text-gray-600">Edita los detalles de este laptop</p>
      </div>

      {/* Status Card */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <p className="text-sm text-gray-600 font-semibold mb-2">ESTADO</p>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(laptop.estado)}`}>
          {getStatusLabel(laptop.estado)}
        </span>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Detalles</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Código de Barra */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Código de Barra
            </label>
            {isEditing ? (
              <input
                type="text"
                name="codigoBarra"
                value={formData.codigoBarra}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa el código de barra"
              />
            ) : (
              <p className="text-gray-700 font-mono">{laptop.codigoBarra || '—'}</p>
            )}
          </div>

          {/* Descripción del Problema */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción del Problema
            </label>
            {isEditing ? (
              <textarea
                name="descripcionProblema"
                value={formData.descripcionProblema}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                placeholder="Describe el problema"
              />
            ) : (
              <p className="text-gray-700">{laptop.descripcionProblema || '—'}</p>
            )}
          </div>

          {/* Encargado */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Encargado del Arreglo
            </label>
            {isEditing ? (
              <input
                type="text"
                name="encargado"
                value={formData.encargado}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del encargado"
              />
            ) : (
              <p className="text-gray-700">{laptop.encargado || '—'}</p>
            )}
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notas Adicionales
            </label>
            {isEditing ? (
              <textarea
                name="notas"
                value={formData.notas}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                placeholder="Añade notas adicionales"
              />
            ) : (
              <p className="text-gray-700">{laptop.notas || '—'}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  ✓ Guardar
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors"
                >
                  ✕ Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
