import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { obtenerDetalleLaptop, actualizarDetalleLaptop } from '../../api/OrdenesApi'
import { Pencil } from 'lucide-react'
import { ScanBarcode } from 'lucide-react'
import { EditarLaptopForm } from '../laptop/EditarLaptopForm'

export const LaptopDetalle = () => {
  const { id, laptopId } = useParams()
  const navigate = useNavigate()
  const [modalEditar, setModalEditar] = useState(false);
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
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [savingStatus, setSavingStatus] = useState(false)

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
        setSelectedStatus(data.estado || null)
      } catch (err) {
        setError(err.message || 'Error al cargar el laptop')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLaptop()
  }, [id, laptopId])

  const getStatusBadge = (status) => {
    const map = {
      'INGRESADA': 'bg-yellow-100 border border-yellow-700 text-yellow-700',
      'EN_REPARACION': 'bg-orange-100 text-orange-700 border border-orange-700',
      'REPARADA': 'bg-green-100 text-green-700 border border-green-700',
      'FALTA_REPUESTO': 'bg-red-100 text-red-700 border border-red-700',
      'ROTA': 'bg-red-200 text-red-800 border border-red-800',
      'DEVUELTA': 'bg-gray-100 text-gray-700 border border-gray-700'
    }
    return map[status] || 'bg-gray-100 text-gray-700'
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

  const handleStatusChange = async (status) => {
    if (!laptop) return
    if (status === selectedStatus) return
    setSelectedStatus(status)
    setSavingStatus(true)
    try {
      await actualizarDetalleLaptop(id, laptopId, { estado: status })
      setLaptop(prev => ({ ...prev, estado: status }))
    } catch (err) {
      console.error('Error actualizando estado', err)
      // revert selection on error
      setSelectedStatus(laptop.estado)
      alert('No se pudo actualizar el estado')
    } finally {
      setSavingStatus(false)
    }
  }
  const handleEditarLaptop = (updatedLaptop) => {
    setLaptop(updatedLaptop)
  }

  const handlePrint = () => {
    window.print()
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
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Detalles de la netbook</h1>
        <p className="text-gray-600">Administra la información de la netbook aquí.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: main content */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Código</p>
                <p className="text-lg font-semibold text-gray-900 font-mono">{laptop.codigoBarra || '—'}</p>

                <p className="text-sm text-gray-500 mt-6">Escuela</p>
                <p className="text-base font-semibold text-gray-900">{laptop.escuela?.nombre || '—'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Posición</p>
                <p className="text-lg font-bold text-gray-900">#{laptop.posicionEnOrden}</p>

                <p className="text-sm text-gray-500 mt-6">Número de orden</p>
                <p className="text-base font-bold text-gray-900">{laptop.orden?.numero || laptop.ordenId || '—'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción del problema</h3>
            <div className="bg-gray-50 p-4 rounded-md text-gray-700">{laptop.descripcionProblema || '—'}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Técnico Asignado</h3>
            <p className="text-gray-700">{laptop.encargado || 'Not assigned'}</p>
          </div>
        </div>

        {modalEditar && (
          <EditarLaptopForm
            laptop={laptop}
            setModal={setModalEditar}
            handleEditarLaptop={handleEditarLaptop}
          />
        )}
        {/* Right: sidebar */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Estado y Acciones</h3>
            <p className="text-sm text-gray-600 mb-3">Estado Actual</p>
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(laptop.estado)}`}>
                {laptop.estado}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <button
                className="w-full font-semibold cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setModalEditar(true)}
                >
                <Pencil className='w-4 h-4'/>
                Editar datos
              </button>
              <button
                className="w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                <Pencil className='w-4 h-4'/>
                Cambiar estado
              </button>
              <button
                className="w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                <ScanBarcode className='w-4 h-4'/>
                Escanear Código
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
