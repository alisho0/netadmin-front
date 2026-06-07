import { X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { crearEscuela } from "../../api/escuelasApi";

export const CrearEscuelaForm = ({ setModal, onCreated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (data, e) => {
    setSubmitError(null);
    setLoading(true);
    try {
      const created = await crearEscuela(data);
      setLoading(false);
      e && e.target && e.target.reset();
      if (onCreated) onCreated(created);
      setModal(false);
    } catch (error) {
      console.error("Error creando escuela:", error);
      setSubmitError(error?.response?.data?.message || "Error al crear la escuela");
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl relative mx-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Agregar una nueva escuela
            </h2>
            <p className="text-sm text-gray-700">
              Registra una nueva escuela aquí.
            </p>
          </div>
          <button
            onClick={() => setModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>
        <div>
          <form
            className="grid md:grid-cols-2 gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="nombre_escuela"
                className="block text-sm text-gray-700"
              >
                Nombre de la escuela:
              </label>
              <input
                {...register("nombre", { required: true })}
                type="text"
                id="nombre"
                className="block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.nombre && (
                <span className="text-red-500 text-sm">
                  Este campo es requerido
                </span>
              )}
            </div>
            <div>
              <label htmlFor="cue" className="block text-sm text-gray-700">
                CUE (opcional):
              </label>
              <input
                {...register("cue")}
                type="text"
                id="cue"
                className="block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="localidad"
                className="block text-sm text-gray-700"
              >
                Localidad:
              </label>
              <input
                {...register("localidad", { required: true })}
                type="text"
                id="localidad"
                className="block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.localidad && (
                <span className="text-red-500 text-sm">
                  Este campo es requerido
                </span>
              )}
            </div>
            <div>
              <label htmlFor="contacto" className="block text-sm text-gray-700">
                Contacto:
              </label>
              <input
                {...register("contacto")}
                type="text"
                id="contacto"
                className="block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm text-gray-700">
                Teléfono de contacto:
              </label>
              <input
                {...register("telefono")}
                type="text"
                id="telefono"
                className="block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {submitError && (
              <div className="md:col-span-2">
                <p className="text-sm text-red-600">{submitError}</p>
              </div>
            )}

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 w-full md:w-auto cursor-pointer rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Creando..." : "Crear escuela"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
