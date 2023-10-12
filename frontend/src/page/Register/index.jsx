import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { createUser } from '../../services/api.js';
import { AuthContext } from '../../contexts/contexts.jsx';
import ButtonLoader from '../../components/ButtonLoader/index.jsx';
import UserDataValidator from '../../tools/userDataValidator.js';
import "./Register.scss"
import PopupWrapper from '../../components/PopupWrapper';

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
            console.log(err.message)
            setPopupData({ type: 'error', text: err.message });
        }

        setIsLoading(false)
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
                    <ButtonLoader type="submit" className={`${isLoading ? "loading" : ""}`}>entrar</ButtonLoader>
                </form>
                <Link to="/login">entrar</Link>
            </section>
            <PopupWrapper popupData={popupData} setPopupData={setPopupData} />
        </main>
    )
}