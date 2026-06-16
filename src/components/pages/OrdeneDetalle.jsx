import React, { useState, useEffect } from "react";
import { obtenerDetalleOrden } from "../../api/OrdenesApi";
import { useNavigate, useParams } from "react-router";
import { cambiarEstadoLaptop } from "../../api/LaptopApi";
import { Eye } from "lucide-react";
import { ScanBarcode } from "lucide-react";
import { Pencil } from "lucide-react";
import { EditarLaptopForm } from "../laptop/EditarLaptopForm";
import { EditarEstadoForm } from "../laptop/EditarEstadoForm";
import Swal from "sweetalert2";

export const OrdeneDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [changedStatusLaptopId, setChangedStatusLaptopId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEditar, setModalOpenEditar] = useState(false);
  const [selectedLaptop, setSelectedLaptop] = useState(null);

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        setLoading(true);
        const data = await obtenerDetalleOrden(id);
        setOrden(data);
      } catch (err) {
        setError(err.message || "Error al cargar la orden");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrden();
  }, [id]);

  const getStatusColor = (status) => {
    const colors = {
      INGRESADA: "bg-yellow-100 border border-yellow-700 text-yellow-700",
      EN_REPARACION: "bg-orange-100 text-orange-700 border border-orange-700",
      REPARADA: "bg-green-100 text-green-700 border border-green-700",
      FALTA_REPUESTO: "bg-red-100 text-red-700 border border-red-700",
      ROTA: "bg-red-200 text-red-800 border border-red-800",
      DEVUELTA: "bg-gray-100 text-gray-700 border border-gray-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getStatusLabel = (status) => {
    const labels = {
      INGRESADA: "Ingresada",
      EN_REPARACION: "En Reparación",
      REPARADA: "Reparada",
      FALTA_REPUESTO: "Falta Repuesto",
      ROTA: "Rota",
    };
    return labels[status] || status;
  };

  const handleStatusChange = async (laptopId, newStatus) => {
    try {
      setChangedStatusLaptopId(laptopId);
      await cambiarEstadoLaptop(laptopId, newStatus);

      setOrden((prev) => ({
        ...prev,
        laptops: prev.laptops.map((laptop) =>
          laptop.id === laptopId ? { ...laptop, estado: newStatus } : laptop,
        ),
      }));

      setChangedStatusLaptopId(null);
      setModalOpen(false);
      Swal.fire({
        title: "Éxito",
        text: "El estado se ha actualizado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setSelectedLaptop(null);
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Error al cambiar estado: " + err.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setChangedStatusLaptopId(null);
    }
  };

  const openStatusModal = (laptop) => {
    setSelectedLaptop(laptop);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLaptop(null);
  };

  const handleEditarLaptop = (updatedLaptop) => {
    setOrden((prev) => ({
      ...prev,
      laptops: prev.laptops.map((l) =>
        l.id === updatedLaptop.id ? updatedLaptop : l,
      ),
    }));
    setModalOpen(false);
    
    Swal.fire({
      title: "Éxito",
      text: "La netbook se ha actualizado correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    setSelectedLaptop(null);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Cargando orden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-md">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!orden) {
    return (
      <div className="p-8">
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-md">
          <p className="text-yellow-600">No se encontró la orden</p>
        </div>
      </div>
    );
  }

  const totalLaptops = orden.laptops.length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <button
        onClick={() => navigate("/ordenes")}
        className="text-blue-600 hover:text-blue-800 font-medium mb-6 flex items-center gap-2"
      >
        <span>←</span> Volver a Órdenes
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          ORD-{String(orden.numeroOrden).padStart(3, "0")}
        </h1>
        <p className="text-gray-600">Gestiona los netbooks en esta orden</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold">ESCUELA</p>
          <p className="text-xl font-bold text-gray-900">{orden.escuela}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold">
            FECHA DE INGRESO
          </p>
          <p className="text-xl font-bold text-gray-900">
            {orden.fechaIngreso}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold">FECHA LÍMITE</p>
          <p className="text-xl font-bold text-red-600">{orden.fechaLimite}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold">ESTADO GENERAL</p>
          <p className="text-xl font-bold text-gray-900">
            {totalLaptops} Netbooks
          </p>
        </div>
      </div>

      {/* Laptops Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Netbooks ({totalLaptops})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                  POSICIÓN
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                  CÓDIGO DE BARRA
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                  MARCA
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                  MODELO
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                  ESTADO
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                  PROBLEMA
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                  ACCIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              {orden.laptops.map((laptop) => {
                return (
                  <tr
                    key={laptop.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {laptop.posicionEnOrden}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-700">
                      {laptop.codigoBarra || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-700">
                      {laptop.marca || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-700">
                      {laptop.modelo || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => openStatusModal(laptop)}
                        disabled={changedStatusLaptopId === laptop.id}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${getStatusColor(
                          laptop.estado,
                        )} ${
                          changedStatusLaptopId === laptop.id
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:shadow-md cursor-pointer"
                        }`}
                      >
                        {getStatusLabel(laptop.estado)}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {laptop.descripcionProblema || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col gap-2 items-center md:flex-row">
                        <button
                          className="bg-blue-100 border hover:bg-blue-200 transition-colors cursor-pointer border-blue-200 rounded-lg p-2"
                          onClick={() =>
                            navigate(`/ordenes/${id}/laptops/${laptop.id}`)
                          }
                        >
                          <Eye className="w-5 h-5 text-blue-600 " />
                        </button>
                        <button className="bg-green-100 border border-green-200 cursor-pointer transition-colors hover:bg-green-200 rounded-lg p-2">
                          <ScanBarcode className="w-5 h-5 text-green-600" />
                        </button>
                        <button
                          className="bg-yellow-100 border border-yellow-200 cursor-pointer transition-colors hover:bg-yellow-200 rounded-lg p-2"
                          onClick={() => {
                            setModalOpenEditar(true);
                            setSelectedLaptop(laptop);
                          }}
                        >
                          <Pencil className="w-5 h-5 text-yellow-600 " />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {modalOpenEditar && selectedLaptop && (
        <EditarLaptopForm
          laptop={selectedLaptop}
          setModal={setModalOpenEditar}
          handleEditarLaptop={handleEditarLaptop}
        />
      )}
      {modalOpen && selectedLaptop && (
        <EditarEstadoForm
          modalOpen={modalOpen}
          selectedLaptop={selectedLaptop}
          changedStatusLaptopId={changedStatusLaptopId}
          getStatusLabel={getStatusLabel}
          handleStatusChange={handleStatusChange}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
