import React, { useState, createContext, useEffect } from "react";
import { api, createSession } from "../services/api"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem('authenticated');
        const token = localStorage.getItem('token');

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser))
            api.defaults.headers.authorization =  `Bearer ${JSON.parse(token)}`
        }

        setLoading(false);
    }, [])

    const login = async (email, password) => {
        try {
            const response = await createSession(email, password);

            if (response.status >= 200 && response.status < 300) {
                const loggedUser = response.data.userInfo;
                const token = response.data.token;

                localStorage.setItem('authenticated', JSON.stringify(loggedUser));
                localStorage.setItem('token', JSON.stringify(token));

                api.defaults.headers.Authorization = `Bearer ${token}`;

                window.location.href = '/dashboard';
            } else {
                localStorage.removeItem('authenticated');
                localStorage.removeItem('token');

                throw new Error(`Erro de servidor: Status ${response.status}`);
            }
        } catch (err) {

            if (!!err.message) {
                throw new Error(`Acesso não autorizado, verifique email e senha.`);
            }

            throw new Error(`Erro ao acessar o servidor, tente novamente mais tarde.`);
        }
    };


    const logout = () => {
        try {
            localStorage.removeItem('authenticated');
            localStorage.removeItem('token');

            // Remova o cabeçalho de autorização
            delete api.defaults.headers.common['Authorization'];

            window.location.href = '/login';
        } catch (err) {
            // Trate erros que podem ocorrer durante o logout, se necessário
            console.error('Erro durante o logout:', err);
            throw new Error('Erro durante o logout, tente novamente mais tarde.');
        }
    };


    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
