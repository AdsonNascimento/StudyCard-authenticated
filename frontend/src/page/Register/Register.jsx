import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { createUser } from '../../services/api.js';
import { AuthContext } from '../../contexts/contexts.jsx';
import UserDataValidator from '../../tools/userDataVAlidator.js';
import "./Register.scss"

export default function Register() {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const { login } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validação dos dados
            UserDataValidator.validateName(name);
            UserDataValidator.validateBirthday(birthday);
            UserDataValidator.validateEmail(email);
            UserDataValidator.validatePassword(password);
            UserDataValidator.validatePasswordConfirmation(password, confirmedPassword);

            // Criação do usuário
            await createUser(name, birthday, email, password, confirmedPassword);
            alert("Usuário criado com sucesso!");

            // Login bem-sucedido
            await login(email, password);
        } catch (error) {
            console.error('Erro durante o processo:', error.message);
            alert("Ocorreu um erro durante o processo, verifique os dados e tente novamente.");
        }
    };



    return (
        <main id="register-page">
            <section>
                <h1 lang="en">Study<span>Card</span></h1>
                <form id="register" action="" method="post" onSubmit={handleSubmit}>
                    <h2>criar conta:</h2>
                    <div className="container-input">
                        <label htmlFor="user">Nome</label>
                        <input
                            className='default-input'
                            type="text"
                            required
                            placeholder="nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="container-input">
                        <label htmlFor="user">Data de nascimento</label>
                        <input
                            className='default-input'
                            type="date"
                            required
                            placeholder="data de nascimento"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>
                    <div className="container-input">
                        <label htmlFor="user">Seu e-mail</label>
                        <input
                            className='default-input'
                            type="email"
                            required
                            placeholder="e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="container-input">
                        <label htmlFor="password">Senha:</label>
                        <input
                            className='default-input'
                            type="password"
                            required
                            placeholder="senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="container-input">
                        <label htmlFor="check-password">Confirme sua senha:</label>
                        <input
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