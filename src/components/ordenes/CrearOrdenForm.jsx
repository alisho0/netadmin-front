import { X } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { listarEscuelasResumen } from '../../api/escuelasApi'
import { crearOrden } from '../../api/OrdenesApi'

export const CrearOrdenForm = ({modalOrden, setModalOrden, handleNuevaOrden}) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      escuelaId: null,
    }
  })

  const [busquedaEscuela, setBusquedaEscuela] = useState('')
  const [escuelaSeleccionada, setEscuelaSeleccionada] = useState(null)
  const [escuelas, setEscuelas] = useState([])
  const [escuelasFiltradas, setEscuelasFiltradas] = useState([])
  const [mostrarDropdown, setMostrarDropdown] = useState(false)
  const [cargandoEscuelas, setCargandoEscuelas] = useState(false)
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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

  const onSubmitOrden = async (data, e) => {
    console.log('Datos a enviar:', data)
    setSubmitError(null);
    setLoading(true);
    try {
      const created = await crearOrden(data);
      setLoading(false);
      e && e.target && e.target.reset();
      if (handleNuevaOrden) handleNuevaOrden(created);
      setModal(false);
    } catch (error) {
      console.error("Error creando orden:", error);
      setSubmitError(error?.response?.data?.message || "Error al crear la orden");
      setLoading(false);
    }
  };
  return (
    <>
        <div className='fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-900'>Nueva Orden</h2>
              <button
                onClick={handleCerrarModal}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <X className='w-6 h-6 cursor-pointer' />
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
                    {...register('cantLaptops', {
                      required: 'La cantidad es requerida',
                      valueAsNumber: true,
                      min: { value: 1, message: 'Debe ser mayor a 0' }
                    })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  {errors.cantLaptops && (
                    <p className='text-red-500 text-sm mt-1'>{errors.cantLaptops.message}</p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Modelo
                  </label>
                  <select
                    {...register('modelo', {
                      required: 'El modelo es requerido'
                    })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value="">Selecciona un modelo</option>
                    <option value="G4">G4</option>
                    <option value="G5/G6">G5/G6</option>
                    <option value="G7">G7</option>
                  </select>
                  {errors.modelo && (
                    <p className='text-red-500 text-sm mt-1'>{errors.modelo.message}</p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Marca
                  </label>
                  <select
                    {...register('marca', {
                      required: 'La marca es requerida'
                    })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value="">Selecciona una marca</option>
                    <option value="Coradir">Coradir</option>
                    <option value="Noblex">Noblex</option>
                    <option value="Juana Manso">Juana Manso</option>
                    <option value="EXO">EXO</option>
                  </select>
                  {errors.marca && (
                    <p className='text-red-500 text-sm mt-1'>{errors.marca.message}</p>
                  )}
                </div>
              </div>

              {/* Botones */}
              <div className='flex gap-3 mt-8'>
                <button
                  type='button'
                  onClick={handleCerrarModal}
                  className='flex-1 cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='flex-1 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400'
                  disabled={!escuelaSeleccionada}
                >
                  Crear Orden
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  )
}
