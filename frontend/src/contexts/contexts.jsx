import React, { useState, createContext, useEffect } from "react";
import { api, createSession } from "../services/api"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = sessionStorage.getItem('authenticated');
        const token = sessionStorage.getItem('token');

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser))
            api.defaults.headers.Authorization = `Bearer ${token}`
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    const login = async (email, password) => {
        const response = await createSession(email, password)

        if (response.status === 401) {
            sessionStorage.removeItem('authenticated')
            sessionStorage.removeItem('token')
        }

        console.log(response.data)

        const loggedUser = response.data.user
        const token = response.data.token


        sessionStorage.setItem('authenticated', JSON.stringify(loggedUser))
        sessionStorage.setItem('token', JSON.stringify(token))

        api.defaults.headers.Authorization = `Bearer ${token}`

        window.location.href = '/home'
    };

    const logout = () => {
        sessionStorage.removeItem('authenticated')
        sessionStorage.removeItem('token')

        api.defaults.headers.Authorization = null

        window.location.href = '/login'
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
