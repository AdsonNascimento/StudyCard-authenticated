import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { createUser } from '../../services/api.js';
import { AuthContext } from '../../contexts/contexts.jsx';
import ButtonLoader from '../../components/ButtonLoader';
import UserDataValidator from '../../tools/UserDataValidator/';
import PopupWrapper from '../../components/PopupWrapper';
import Logo from '../../components/Logo'

export default function Register() {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const [popupData, setPopupData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)


        try {
            // Validação dos dados
            UserDataValidator.validateUserName(name);
            UserDataValidator.validateBirthday(birthday);
            UserDataValidator.validateEmail(email);
            UserDataValidator.validatePassword(password);
            UserDataValidator.validatePasswordConfirmation(password, confirmedPassword);

            // Criação do usuário
            await createUser(name, birthday, email, password, confirmedPassword);
            alert("Usuário criado com sucesso!");

            // Login bem-sucedido
            await login(email, password);
        } catch (err) {
            setPopupData({ type: 'error', text: err.message });
        }

        setIsLoading(false)
    };

    return (
        <main id="form-page">
            <section>
                <Logo />
                <form id="register" action="" method="post" onSubmit={handleSubmit}>
                    <legend>criar conta:</legend>

                    <label>
                        <span>Nome</span>
                        <input
                            className='default-input'
                            type="text"
                            required
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>Data de Nascimento</span>
                        <input
                            className='default-input'
                            type="date"
                            required
                            placeholder="Data de Nascimento"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>Seu E-mail</span>
                        <input
                            className='default-input'
                            type="email"
                            required
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>Senha</span>
                        <input
                            className='default-input'
                            type="password"
                            required
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>Confirme sua Senha</span>
                        <input
                            className='default-input'
                            type="password"
                            required
                            placeholder="Confirme sua Senha"
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                        />
                    </label>

                    <ButtonLoader type="submit" className={`${isLoading ? "loading" : ""}`}>entrar</ButtonLoader>
                </form>
                <Link to="/login">entrar</Link>
            </section>
            <PopupWrapper popupData={popupData} setPopupData={setPopupData} />
        </main>
    )
}