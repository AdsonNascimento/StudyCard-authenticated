import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/contexts';
import { Link } from 'react-router-dom';
import UserDataValidator from '../../tools/UserDataValidator';
import ButtonLoader from '../../components/ButtonLoader';
import PopupWrapper from '../../components/PopupWrapper';
import Logo from '../../components/Logo'

function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validação dos dados
      UserDataValidator.validateEmail(email);
      UserDataValidator.validatePassword(password);

      // Login bem-sucedido
      await login(email, password);
    } catch (err) {
      setPopupData({ type: 'error', text: err.message });
    }

    setIsLoading(false);
  }

  return (
    <main id='form-page'>
      <section>
        <Logo />
        <form id="login" action="" method="post" onSubmit={handleSubmit}>
          <legend>login:</legend>
          <label>
            <span>E-mail</span>
            <input
              className='default-input'
              type="email"
              required
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <span>Senha:</span>
            <input
              className='default-input'
              type="password"
              required
              placeholder="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <ButtonLoader type="submit" className={`${isLoading ? "loading" : ""}`}>entrar</ButtonLoader>
        </form>
        <Link to="/register">cadastre-se</Link>
      </section>
      <PopupWrapper popupData={popupData} setPopupData={setPopupData} />
    </main >
  )
}

export default Login;
