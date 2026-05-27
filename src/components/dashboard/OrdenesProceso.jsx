import React from 'react'

export const TablaOrdenes = ({nombreTabla, data}) => {
  const orders = [
    { id: 'ORD-001', escuela: 'Central High School', date: '5/10/2024', qty: 4, status: 'In Progress' },
    { id: 'ORD-002', school: 'North Elementary', date: '5/12/2024', qty: 2, status: 'In Progress' },
    { id: 'ORD-003', school: 'South Middle School', date: '5/8/2024', qty: 1, status: 'Completed' },
  ]

  return (
    <>
      <section className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Órdenes en proceso</h2>
        <div className="overflow-x-auto">
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
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">-</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-semibold">-</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-semibold">-</td>
                  <td className="px-6 py-4 text-sm text-red-700 font-semibold">-</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-semibold">-</td>
                  <td className="px-6 py-4 text-sm text-semibold">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium`}>
                      -
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">Detalle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
