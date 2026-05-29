import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/laptops';

export const actualizarLaptop = async(laptopId, data) => {
    try {
        const response = await axios.put(`${API_URL}/${laptopId}`, data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar laptop:', error);
        throw error;
    }
}