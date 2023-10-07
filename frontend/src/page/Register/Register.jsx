import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { createUser } from '../../services/api.js';
import { AuthContext } from '../../contexts/contexts.jsx';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const { login } = useContext(AuthContext);


    const handleSubmit = (e) => {
        e.preventDefault(); // Impede a recarga da página

        if (password != checkPassword) {
            return alert("Senhas não coincidem")
        }

        try {
            createUser(email, password)
            alert("usuario criado com sucesso!")
            login(email, password);

            setEmail("")
            setPassword("")
            setCheckPassword("")

        } catch (err) {
            console.error("erro ao criar usuário: ", err)
            alert("Erro ao criar usuário, tente novamente mais tarde!")
        }
    }

    return (
        <main>
            <h1 lang="en">Study<span>Card</span></h1>

            <form id="login" action="" method="post" onSubmit={handleSubmit}>

                <h2>cadastre-se:</h2>

                <div className="login-info">
                    <label htmlFor="user">seu e-mail</label>
                    <input
                        id="user"
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
                        type="password"
                        required
                        placeholder="confirme sua senha"
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                    />
                </div>

                <button type="submit">confirmar</button>
            </form>

            <Link to="/login">entrar</Link>
        </main>
    )
}