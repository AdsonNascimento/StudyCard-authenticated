import axios from "axios";
import handleApiError from '../tools/handleApiError.js'

export const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const createSession = async (email, password) => {
    try {
        const response = await api.post('/sessions', { email, password });

        if (response.status !== 200) {
            throw new Error(`Erro de servidor: Status ${response.status}`);
        }

        return response;
    } catch (error) {
        handleApiError(error);
    }
};

export async function createUser(name, birthday, email, password, confirmedPassword) {
    try {
        const response = await api.post('/user', { name, birthday, email, password, confirmedPassword });

        if (response.status < 200 && response.status >= 300 ) {
            throw new Error(`Erro de servidor: Status ${response.status}`);
        }

        return response;
    } catch (error) {
        handleApiError(error);
    }
}
