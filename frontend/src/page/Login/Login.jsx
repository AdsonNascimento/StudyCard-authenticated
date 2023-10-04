import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/contexts.jsx';
import './Login.scss';
import { Link } from 'react-router-dom';

function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('teste@teste.com');
  const [password, setPassword] = useState('1234');

  const handleSubmit = (e) => {
    
    console.log("submit", { email, password });
    
    login(email, password);
    e.preventDefault(); // Impede a recarga da página
  }

  return (
    <main>
      <h1 lang="en">Study<span>Card</span></h1>

      <form id="login" action="" method="post" onSubmit={handleSubmit}>

        <h2>login:</h2>

        <div className="login-info">
          <label htmlFor="user">E-mail</label>
          <input
            id="user"
            type="email"
            required
            placeholder="e-mail"
            autoComplete='off'
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
            autoComplete='off'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">entrar</button>
      </form>

      <Link to="/register">cadastre-se</Link>
    </main>
  )
}

export default Login;