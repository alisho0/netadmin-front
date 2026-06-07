import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1';

export const listarEscuelas = async () => {
    try {
        const response = await axios.get(`${API_URL}/escuelas`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al listar escuelas:', error);
        throw error;
    }
}

export const listarEscuelasResumen = async () => {
    try {
        const response = await axios.get(`${API_URL}/escuelas/select`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al listar resumen de escuelas:', error);
        throw error;
    }
}

export const crearEscuela = async (escuelaData) => {
    try {
        const response = await axios.post(`${API_URL}/escuelas`, escuelaData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al crear escuela:', error);
        throw error;
    }
}