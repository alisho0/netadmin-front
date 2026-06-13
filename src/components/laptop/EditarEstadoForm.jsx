import React from 'react'

export const EditarEstadoForm = ({ modalOpen, selectedLaptop, changedStatusLaptopId, getStatusLabel, handleStatusChange, closeModal }) => {
  return (
    <>
      {/* Modal para cambiar estado */}
      {modalOpen && selectedLaptop && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Cambiar Estado
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Laptop Info */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 font-semibold">
                Laptop:{" "}
                <span className="text-gray-900">
                  {selectedLaptop.codigoBarra || "N/A"}
                </span>
              </p>
              <p className="text-sm text-gray-600 font-semibold mt-2">
                Estado actual:{" "}
                <span className="text-yellow-500 font-bold">
                  {getStatusLabel(selectedLaptop.estado)}
                </span>
              </p>
            </div>

            {/* Status Options */}
            <div className="space-y-3 mb-6">
              {[
                "INGRESADA",
                "EN_REPARACION",
                "REPARADA",
                "FALTA_REPUESTO",
                "ROTA",
              ].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(selectedLaptop.id, status)}
                  disabled={changedStatusLaptopId === selectedLaptop.id}
                  className={`w-full p-3 rounded-lg border-2 text-left font-semibold transition-all ${
                    selectedLaptop.estado === status
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${
                    changedStatusLaptopId === selectedLaptop.id
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          status === "INGRESADA"
                            ? "bg-yellow-400"
                            : status === "EN_REPARACION"
                              ? "bg-orange-400"
                              : status === "REPARADA"
                                ? "bg-green-400"
                                : status === "FALTA_REPUESTO"
                                  ? "bg-red-400"
                                  : "bg-red-700"
                        }`}
                      ></span>
                      <span className="text-gray-900">
                        {getStatusLabel(status)}
                      </span>
                    </div>
                    {selectedLaptop.estado === status && (
                      <span className="text-xs text-blue-600 font-semibold">
                        Actual
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={closeModal}
                className="w-full text-gray-600 hover:text-gray-900 font-semibold text-right"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
