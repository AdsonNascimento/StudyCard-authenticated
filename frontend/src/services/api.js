import axios from "axios";
import handleApiError from '../tools/handleApiError.js';

let BASE_URL = "http://localhost:3001";

if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://bksc.onrender.com";
}

export const api = axios.create({
    baseURL: BASE_URL,
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

        if (response.status < 200 && response.status >= 300) {
            throw new Error(`Erro de servidor: Status ${response.status}`);
        }

        return response;
    } catch (error) {
        handleApiError(error);
    }
}
