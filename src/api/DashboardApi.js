import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1/dashboard';

export const traerMetricasDashboard = async(params = {}) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al traer las metricas:', error);
        throw error;
    }
}