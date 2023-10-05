import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    const login = async (email, password) => {
        const loggedUser = {email, password}

        if (password === "1234") {
            localStorage.setItem('authenticated', JSON.stringify(loggedUser))
            window.location.href = '/home'
            
        }
    };

    const logout = () => {
        localStorage.removeItem('authenticated')

        window.location.href = '/login'
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
