import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/contexts.jsx';
import './Login.scss';
import { Link } from 'react-router-dom';

function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    
    login(email, password);
    e.preventDefault();
  }

  return (
    <main id='login-page'>
      <section>
        <h1 lang="en">Study<span>Card</span></h1>
        <form id="login" action="" method="post" onSubmit={handleSubmit}>
          <h2>login:</h2>
          <div className="login-info">
            <label htmlFor="user">E-mail</label>
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
          <button type="submit">entrar</button>
        </form>
        <Link to="/register">cadastre-se</Link>
      </section>
    </main>
  )
}

export default Login;