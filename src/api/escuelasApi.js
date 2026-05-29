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