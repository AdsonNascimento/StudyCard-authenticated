import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/contexts.jsx';


export default function Dashboard() {
    const { logout } = useContext(AuthContext);

    return (
        <>
            <h1>Home page</h1>

            <button onClick={logout}>
                sair
            </button>
        </>
    )
}