import axios from "axios";
import handleApiError from '../tools/handleApiError.js';

let BASE_URL = "http://localhost:5000";

if (process.env.NODE_ENV === "production") {
    BASE_URL = "https://bksc.onrender.com";
}

export const api = axios.create({
    baseURL: BASE_URL,
});

export const createSession = async (email, password) => {
    try {
        const response = await api.post('/sessions', { email, password });

        if (response.status < 200 && response.status > 300) {
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

export const createMatter = async (emailUser, matterName, matterDescription, matterDifficulty) => {
    try {
        const difficulty = parseInt(matterDifficulty);
        const response = await api.post(
            '/discipline',
            {
                email: emailUser,
                discipline: matterName,
                description: matterDescription,
                difficulty
            }
        );

        return response;
    } catch (error) {
        handleApiError(error);
        throw error; // Retorna ou lança o erro novamente após a manipulação
    }
}

export const listMatters = async (email) => {
    try {
        const response = await api.get(`/discipline/${email}`);

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Erro de servidor: Status ${response.status}`);
        }

        return response;
    } catch (error) {
        handleApiError(error);
    }
}

export const showMatter = async (email, id) => {
    try {
        const response = await api.get(`/discipline/${email}/${id}`);

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Erro de servidor: Status ${response.status}`);
        }

        return response;
    } catch (error) {
        handleApiError(error);
    }
}

export const updateMatter = async (email, id, discipline, description, difficulty) => {
    try {
        const response = await api.put(`/discipline/${email}/${id}`,
            { discipline, description, difficulty }
        );

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Erro de servidor: Status ${response.status}`);
        }

        return response;
    } catch (error) {
        handleApiError(error);
    }
}

export const deleteMatter = async (email, id) => {
    try {
        const response = await api.delete(`/discipline/${email}/${id}`);

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Erro de servidor: Status ${response.status}`);
        }

        return response;
    } catch (error) {
        handleApiError(error);
    }
}

export const createCard = async (disciplineId, question, answers, initialDifficulty) => {
    try {
        const response = await api.post(
            '/card',
            {
                disciplineId,
                question,
                answers,
                initialDifficulty
            }
        )

        return response
    } catch (error) {
        handleApiError(error)
        throw error
    }
}

export const showCards = async (email, id_matter) => {
    try {
        const response = await api.get(`/card/${email}/${id_matter}`);

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Erro de servidor: Status ${response.status}`);
        }

        return response;
    } catch (error) {
        handleApiError(error);
    }
}