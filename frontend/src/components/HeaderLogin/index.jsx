import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/contexts.jsx';
import './style.scss'
import Logo from '../Logo'

export default function HeaderLogin() {
    const { logout } = useContext(AuthContext);

    return (
        <header id='header-login'>
            <nav>
                <Logo />

                <button onClick={logout}>
                    sair
                </button>
            </nav>
        </header>
    );
}
