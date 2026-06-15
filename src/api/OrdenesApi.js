import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/ordenes';

export const traerOrdenes = async(params = {}) => {
    try {
        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error('Error al traer las órdenes:', error);
        throw error;
    }
}

export const crearOrden = async(data) => {
    try {
        console.log('Enviando datos a la API:', data);
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error al crear la orden:', error);
        throw error;
    }
}

export const obtenerDetalleOrden = async(id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener detalle de la orden:', error);
        throw error;
    }
}

export const obtenerDetalleLaptop = async(ordenId, laptopId) => {
    try {
        const response = await axios.get(`${API_URL}/${ordenId}/laptops/${laptopId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener detalle del laptop:', error);
        throw error;
    }
}

export const actualizarDetalleLaptop = async(ordenId, laptopId, data) => {
    try {
        const response = await axios.put(`${API_URL}/${ordenId}/laptops/${laptopId}`, data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar detalle del laptop:', error);
        throw error;
    }
}