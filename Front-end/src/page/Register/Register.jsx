import { Link } from "react-router-dom";

export default function Register() {
    return (
        <main>
            <h1 lang="en">Study<span>Card</span></h1>

            <form id="login" action="" method="post">

                <h2>cadastre-se:</h2>

                <div className="login-info">
                    <label htmlFor="user">seu e-mail</label>
                    <input id="user" type="email" required placeholder="e-mail" />
                </div>

                <div className="login-info">
                    <label htmlFor="password">Senha:</label>
                    <input id="password" type="password" required placeholder="senha" />
                </div>

                <div className="login-info">
                    <label htmlFor="password-confirm">Confirme sua senha:</label>
                    <input id="password-confirm" type="password" required placeholder="confirme sua senha" />
                </div>

                <button type="submit">confirmar</button>
            </form>

            <Link to="/login">entrar</Link>
        </main>
    )
}