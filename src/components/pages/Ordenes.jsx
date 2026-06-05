import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { traerOrdenes } from '../../api/OrdenesApi'
import { listarEscuelas, listarEscuelasResumen } from '../../api/escuelasApi'
import { useNavigate } from 'react-router'
import { PlusIcon } from 'lucide-react'
import { CrossIcon } from 'lucide-react'
import { X } from 'lucide-react'

export const Ordenes = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      escuelaId: null,
      cantidadLaptops: '',
    }
  })
  
  const [ordenes, setOrdenes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalOrden, setModalOrden] = useState(false)
  const [busquedaEscuela, setBusquedaEscuela] = useState('')
  const [escuelaSeleccionada, setEscuelaSeleccionada] = useState(null)
  const [escuelas, setEscuelas] = useState([])
  const [escuelasFiltradas, setEscuelasFiltradas] = useState([])
  const [mostrarDropdown, setMostrarDropdown] = useState(false)
  const [cargandoEscuelas, setCargandoEscuelas] = useState(false)

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

  // Cargar escuelas cuando se abre el modal
  useEffect(() => {
    if (modalOrden && escuelas.length === 0) {
      const cargarEscuelas = async () => {
        try {
          setCargandoEscuelas(true)
          const data = await listarEscuelasResumen()
          console.log('Escuelas cargadas:', data)
          setEscuelas(data)
        } catch (err) {
          console.error('Error al cargar escuelas:', err)
        } finally {
          setCargandoEscuelas(false)
        }
      }
      cargarEscuelas()
    }
  }, [modalOrden])

  // Filtrar escuelas según búsqueda
  useEffect(() => {
    if (busquedaEscuela.trim() === '') {
      setEscuelasFiltradas([])
      setMostrarDropdown(false)
    } else {
      const filtradas = escuelas.filter((escuela) => {
        const nombre = (escuela.escuela || '').toLowerCase()
        const cue = (escuela.cue || '').toLowerCase()
        const busqueda = busquedaEscuela.toLowerCase()
        return nombre.includes(busqueda) || cue.includes(busqueda)
      })
      console.log('Filtradas:', filtradas)
      setEscuelasFiltradas(filtradas)
      setMostrarDropdown(true)
    }
  }, [busquedaEscuela, escuelas])

  const handleSeleccionarEscuela = (escuela) => {
    setEscuelaSeleccionada(escuela)
    setBusquedaEscuela(escuela.escuela)
    setMostrarDropdown(false)
    setValue('escuelaId', escuela.id)
  }

  const handleCerrarModal = () => {
    setModalOrden(false)
    setBusquedaEscuela('')
    setEscuelaSeleccionada(null)
    reset()
  }

  const onSubmitOrden = (data) => {
    const nuevoOrden = {
      escuelaId: escuelaSeleccionada.id,
      cantidadLaptops: parseInt(data.cantidadLaptops),
    }
    console.log('Crear orden:', nuevoOrden)
    // Aquí irá la llamada a la API para crear la orden
    handleCerrarModal()
  }

  const getStatusColor = (status) => {
    if (status === 'REPARANDO') return 'bg-orange-100 text-orange-600'
    if (status === 'COMPLETADO') return 'bg-green-100 text-green-600'
    if (status === 'EN_ESPERA') return 'bg-yellow-100 text-yellow-600'
    if (status === 'ENTREGADO') return 'bg-yellow-100 text-green-800'
    return 'bg-gray-100 text-gray-600'
  }


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Órdenes</h1>
      <p className="text-gray-600 mb-4">Gestiona todas las órdenes aquí</p>
      <div onClick={() => setModalOrden(true)} className='p-3 cursor-pointer hover:bg-blue-700 transition-colors rounded-xl bg-blue-600 text-white font-semibold flex gap-2'>
        <PlusIcon className='w-4'/>
        <p>Nueva Orden</p>
      </div>
      {modalOrden && (
        <div className='fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-900'>Nueva Orden</h2>
              <button
                onClick={handleCerrarModal}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <X className='w-6 h-6' />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmitOrden)}>
              <div className='space-y-6'>
                {/* Seleccionar Escuela */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Seleccionar Escuela
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='Buscar escuela...'
                      value={busquedaEscuela}
                      onChange={(e) => setBusquedaEscuela(e.target.value)}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    
                    {/* Dropdown */}
                    {mostrarDropdown && (
                      <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10'>
                        {cargandoEscuelas ? (
                          <div className='p-3 text-gray-500 text-sm text-center'>
                            Cargando escuelas...
                          </div>
                        ) : escuelasFiltradas.length > 0 ? (
                          escuelasFiltradas.map((escuela) => (
                            <button
                              key={escuela.id}
                              type='button'
                              onClick={() => handleSeleccionarEscuela(escuela)}
                              className='w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0'
                            >
                              <div className='font-medium text-gray-900'>{escuela.escuela}</div>
                              <div className='text-sm text-gray-500'>CUE: {escuela.cue}</div>
                            </button>
                          ))
                        ) : (
                          <div className='p-3 text-gray-500 text-sm text-center'>
                            No se encontraron escuelas
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cantidad de Laptops */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Cantidad de Laptops
                  </label>
                  <input
                    type='number'
                    min='1'
                    placeholder='Ingresa la cantidad...'
                    {...register('cantidadLaptops', {
                      required: 'La cantidad es requerida',
                      min: { value: 1, message: 'Debe ser mayor a 0' }
                    })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  {errors.cantidadLaptops && (
                    <p className='text-red-500 text-sm mt-1'>{errors.cantidadLaptops.message}</p>
                  )}
                </div>
              </div>

              {/* Botones */}
              <div className='flex gap-3 mt-8'>
                <button
                  type='button'
                  onClick={handleCerrarModal}
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400'
                  disabled={!escuelaSeleccionada}
                >
                  Crear Orden
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(o.estado)}`}>
                          {o.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button 
                          onClick={() => navigate(`/ordenes/${o.id}`)}
                          className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                        >
                          Detalle
                        </button>
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
