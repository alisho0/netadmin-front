import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/ordenes';

export const traerOrdenes = async() => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al traer las órdenes:', error);
        throw error;
    }
}