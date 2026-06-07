
import { useEffect } from 'react';
import { useState } from 'react';
import { listarEscuelas } from '../../api/escuelasApi';
import { LocationEditIcon } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';
import { CrearEscuelaForm } from '../escuela/CrearEscuelaForm';
import { PlusIcon } from 'lucide-react';

export const Escuelas = () => {
  const [escuelas, setEscuelas] = useState([]);
  const [modal, setModal] = useState(false);
  const handleNuevaEscuela = (escuela) => {
    setEscuelas((prev) => [escuela, ...prev]);
  };
  useEffect(() => {
    const fetchEscuelas = async () => {
      const data = await listarEscuelas();
      setEscuelas(data);
      console.log(data);
    };
    fetchEscuelas();
  }, []);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Escuelas</h1>
      <p className="text-gray-600 mb-4">Gestiona tus escuelas aquí</p>
      
      <div onClick={() => setModal(true)} className='p-3 mb-4 cursor-pointer hover:bg-blue-700 transition-colors rounded-xl bg-blue-600 text-white font-semibold flex gap-2'>
        <PlusIcon className='w-4'/>
        <p>Nueva Escuela</p>
      </div>
      {(modal && <CrearEscuelaForm setModal={setModal} onCreated={handleNuevaEscuela} />)}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array.isArray(escuelas) && escuelas.length > 0 ? escuelas.map((e) => (
          <div className='border p-3 rounded-2xl border-gray-200 bg-white shadow' key={e.id}>
            <h2 className="px-2 pt-1 text-xl font-semibold text-gray-700">{e.nombre} | CUE: {e.cue}</h2>
            <div className='flex flex-col gap-1.5 mt-4 border-b border-b-gray-400 pb-3'>
              <div className='flex gap-1'>
                <MapPin className='text-blue-600 w-4'/>
                <div>
                  <p className='text-gray-500 text-sm '>Localidad</p>
                  <span className='font-semibold'>{e.localidad}</span>
                </div>
              </div>
              <div className='flex flex-col md:flex-row gap-1 md:justify-between '>
                
              <div className='flex gap-1'>
                <Mail className='text-blue-600 w-4'/>
                <div>
                  <p className='text-gray-500 text-sm '>Contacto</p>
                  <span className='font-semibold'>{e.contacto}</span>
                </div>
              </div>
              <div className='flex gap-1'>
                <LocationEditIcon className='text-blue-600 w-4'/>
                <div>
                  <p className='text-gray-500 text-sm '>Teléfono de contacto</p>
                  <span className='font-semibold'>{e.telefono}</span>
                </div>
              </div>
              </div>
            </div>

            <div>
              <h3 className='px-2 font-semibold my-2'>Órdenes</h3>
              <div>
                {Array.isArray(e.ordenes) && e.ordenes.length > 0 ? e.ordenes.map((o) => (
                  <div key={o.id} className='flex px-2 py-1 hover:bg-gray-100 transition-colors cursor-pointer border items-center mb-2 border-gray-300 rounded-lg bg-gray-100/50 justify-between'>
                    <div>
                      <h4 className='font-semibold'>Orden N°{o.numeroOrden}</h4>
                      <div className='flex gap-3 text-sm'>
                        <p className='text-gray-600'>{o.fechaIngreso}</p>
                        <p className='text-gray-600'>{o.cantLaptops} netbooks</p>
                      </div>
                    </div>

                    <div className={`py-1 px-2 rounded-lg ${o.estado == 'COMPLETADO' ? 'bg-green-600 border border-green-800' : 'bg-orange-300/90 border border-orange-800'}`}>
                      <p className={`font-semibold text-sm ${o.estado == 'COMPLETADO' ? 'text-green-800' : 'text-orange-800'}`}>{o.estado}</p>
                    </div>
                  </div>
                )) : (
                  <p className='text-gray-500 text-sm p-3'>Sin ordenes...</p>
                )}
              </div>
            </div>
          </div>
        )) : (
          <p>No hay escuelas registradas.</p>
        )}
      </section>
    </div>
  )
}
