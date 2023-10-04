import axios from "axios";

export const api = axios.create({
    baseUrl: "http://localhost:3000",
})

export const createSession = async (email, password) => {
    return api.post('/login', {email, password})
}