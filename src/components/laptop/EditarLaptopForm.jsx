import { X } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

export const EditarLaptopForm = ({ laptop, setModal }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('Datos del formulario:', data);
        // Aquí puedes agregar la lógica para enviar los datos al backend o actualizar el estado
        setModal(false); // Cerrar el modal después de guardar
    }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl relative mx-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Editar datos de la netbook
                    </h2>
                    <p className="text-sm text-gray-700">
                        Edita los datos de la netbook aquí. Recuerda guardar los cambios antes de salir.
                    </p>
                </div>
                <button
                    onClick={() => setModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-6 h-6 cursor-pointer" />
                </button>
            </div>

            <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="codigo" className="block text-sm text-gray-700">
                        Código de la netbook:
                    </label>
                    <input
                      id='codigo'
                      type='text'
                      {...register('codigoBarra')}
                      placeholder='Código de la netbook'
                      defaultValue={laptop.codigoBarra}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor="descripcion" className="block text-sm text-gray-700">
                        Descripción del problema:
                    </label>
                    <input
                      id='descripcion'
                      type='text'
                      {...register('descripcionProblema')}
                      placeholder='Descripción del problema'
                      defaultValue={laptop.descripcionProblema || '-'}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                
                <div className='flex gap-3 mt-2 flex-col md:flex-row  pt-4 justify-end'>
                    <button
                    type='button'
                    onClick={() => setModal(false)}
                    className='flex-1 cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors'
                    >
                    Cancelar
                    </button>
                    <button
                    type='submit'
                    className='flex-1 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400'
                    >
                    Crear Orden
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
