
import { useEffect } from 'react';
import { useState } from 'react';
import { listarEscuelas } from '../../api/escuelasApi';
import { LocationEditIcon } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';

export const Escuelas = () => {
  const [escuelas, setEscuelas] = useState([]);
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

      <section>
        {escuelas.length > 0 ? escuelas.map((e) => (
          <div className='border p-3 rounded-2xl border-gray-200 bg-white shadow' key={e.id}>
            <h2 className="px-2 pt-1 text-xl font-semibold text-gray-700">{e.nombre}</h2>
            <div className='flex gap-4 mt-4 border-b border-b-gray-400 pb-3'>
              <div className='flex gap-1'>
                <MapPin className='text-blue-600 w-4'/>
                <div>
                  <p className='text-gray-500 text-sm '>Localidad</p>
                  <span className='font-semibold'>{e.localidad}</span>
                </div>
              </div>
              <div className='flex gap-1'>
                <Mail className='text-blue-600 w-4'/>
                <div>
                  <p className='text-gray-500 text-sm '>Contacto</p>
                  <span className='font-semibold'>{e.contacto}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className='px-2 font-semibold my-4'>Órdenes</h3>
              <div>
                {e.ordenes.length > 0 ? e.ordenes.map((o) => (
                  <div className='flex hover:bg-gray-100 transition-colors cursor-pointer p-3 border items-center mb-2 border-gray-300 rounded-2xl bg-gray-100/50 justify-between'>
                    <div>
                      <h4 className='font-semibold text-lg'>Orden N°{o.numeroOrden}</h4>
                      <div className='flex gap-3'>
                        <p className='text-gray-600'>{o.fechaIngreso}</p>
                        <p>-</p>
                        <p className='text-gray-600'>{o.cantLaptops} netbooks</p>
                      </div>
                    </div>

                    <div className={`py-1 px-3 rounded-3xl ${o.estado == 'COMPLETADO' ? 'bg-green-600' : 'bg-orange-300/90'}`}>
                      <p className={`font-semibold ${o.estado == 'COMPLETADO' ? 'text-green-800' : 'text-orange-800'}`}>{o.estado}</p>
                    </div>
                  </div>
                )) : (
                  <p>Sin ordenes...</p>
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
