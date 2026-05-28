import { Package, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { TablaOrdenes } from '../dashboard/OrdenesProceso'
import { traerOrdenes } from '../../api/OrdenesApi'
import { traerMetricasDashboard } from '../../api/DashboardApi'

export const Dashboard = () => {
  const [ordenesReparando, setOrdenesReparando] = useState([])
  const [metricas, setMetricas] = useState({})
  const [ordenesCompletadas, setOrdenesCompletadas] = useState([])
  const [cargando, setCargando] = useState(true)

  const metricasConfig = [
    { 
      key: 'laptopsEnReparacion', 
      label: 'Laptops en Reparación',
      icon: Package,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      iconColor: 'text-blue-500'
    },
    { 
      key: 'laptopsPendientes', 
      label: 'Laptops Pendientes',
      icon: Clock,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      iconColor: 'text-yellow-500'
    },
    { 
      key: 'ordenesActivas', 
      label: 'Órdenes Activas',
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      iconColor: 'text-green-500'
    },
    { 
      key: 'ordenesVencidas', 
      label: 'Órdenes Vencidas',
      icon: AlertCircle,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      iconColor: 'text-red-500'
    }
  ]

  useEffect(() => {
    const cargarOrdenes = async () => {
      try {
        setCargando(true)
        const [dataReparando, dataCompletadas] = await Promise.all([
          traerOrdenes({ estado: 'REPARANDO' }),
          traerOrdenes({ estado: 'COMPLETADO' })
        ])
        const metricasData = await traerMetricasDashboard()
        
        setOrdenesReparando(dataReparando)
        setOrdenesCompletadas(dataCompletadas)
        setMetricas(metricasData)
        console.log('Órdenes en proceso:', dataReparando)
        console.log('Órdenes completadas:', dataCompletadas)
        console.log('Métricas:', metricasData)
      } catch (error) {
        console.error('Error al traer las órdenes:', error)
      } finally {
        setCargando(false)
      }
    }
    
    cargarOrdenes()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <p className="text-gray-600">Bienvenido al panel de control</p>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {!cargando && metricasConfig.map((metrica) => {
          const Icon = metrica.icon
          return (
            <div key={metrica.key} className="p-4 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-700">{metrica.label}</h3>
                <h1 className="text-3xl font-bold text-gray-800">{metricas[metrica.key] || 0}</h1>
              </div>
              <div className={`w-12 h-12 ${metrica.bgColor} rounded-full flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${metrica.iconColor}`} />
              </div>
            </div>
          )
        })}
      </section>

      {/* Tablas de ordenes */}
      {!cargando && <TablaOrdenes ordenesReparando={ordenesReparando} ordenesCompletadas={ordenesCompletadas} />}
    </div>
  )
}
