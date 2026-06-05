import { X } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

export const CrearEscuelaForm = ({ setModal }) => {
    const {register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-900/50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg w-96 relative'>
            <div className='mb-4'>
                <h2 className='font-semibold text-xl'>Agregar una nueva escuela</h2>
                <p className='text-sm text-gray-700'>Registra una nueva escuela aquí.</p>
            </div>
            <X onClick={() => setModal(false)} className='absolute top-4 right-4 cursor-pointer' />
            <div>
                <form className='grid md:grid-cols-2 gap-2' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="nombre_escuela" className='block text-sm text-gray-700'>
                            Nombre de la escuela:
                        </label>
                        <input {...register("nombre_escuela", { required: true })} type="text" id="nombre_escuela" className='block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500' />
                        {errors.nombre_escuela && <span className='text-red-500 text-sm'>Este campo es requerido</span>}
                    </div>
                    <div>
                        <label htmlFor="cue" className='block text-sm text-gray-700'>
                            CUE (opcional):
                        </label>
                        <input {...register("cue")} type="text" id="cue" className='block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500' />
                    </div>
                    <div>
                        <label htmlFor="localidad" className='block text-sm text-gray-700'>
                            Localidad:
                        </label>
                        <input {...register("localidad", { required: true })} type="text" id="localidad" className='block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500' />
                        {errors.localidad && <span className='text-red-500 text-sm'>Este campo es requerido</span>}
                    </div>
                    <div>
                        <label htmlFor="contacto" className='block text-sm text-gray-700'>
                            Contacto:
                        </label>
                        <input {...register("contacto")} type="text" id="contacto" className='block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500' />
                    </div>
                    <div>
                        <button type="submit" className='bg-blue-500 text-white py-2 px-4 cursor-pointer rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                            Crear escuela
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}
