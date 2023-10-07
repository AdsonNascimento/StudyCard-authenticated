import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { createUser } from '../../services/api.js';
import { AuthContext } from '../../contexts/contexts.jsx';
import "./Register.scss"
import strongPassword from '../../tools/strongPassword.js';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const { login } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmedPassword) {
            return alert("Senhas não coincidem");
        }

        if (!strongPassword(password, confirmedPassword)) {
            return alert("Senha fraca!");
        }

        try {
            await createUser(email, password, confirmedPassword);
            alert("Usuário criado com sucesso!");
            await login(email, password);
        } catch (error) {
            console.error(error.message)
            alert("Ocorreu um erro ao criar o usuário, tente novamente mais tarde!");
        }
    };


    return (
        <main id="register-page">
            <section>
                <h1 lang="en">Study<span>Card</span></h1>
                <form id="register" action="" method="post" onSubmit={handleSubmit}>
                    <h2>cadastre-se:</h2>
                    <div className="login-info">
                        <label htmlFor="user">seu e-mail</label>
                        <input
                            id="user"
                            className='default-input'
                            type="email"
                            required
                            placeholder="e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="login-info">
                        <label htmlFor="password">Senha:</label>
                        <input
                            id="password"
                            className='default-input'
                            type="password"
                            required
                            placeholder="senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="login-info">
                        <label htmlFor="check-password">Confirme sua senha:</label>
                        <input
                            id="check-password"
                            className='default-input'
                            type="password"
                            required
                            placeholder="confirme sua senha"
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">confirmar</button>
                </form>
                <Link to="/login">entrar</Link>
            </section>
        </main>
    )
}