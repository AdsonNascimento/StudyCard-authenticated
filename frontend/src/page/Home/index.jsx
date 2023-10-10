import './Home.scss'
import { Link } from 'react-router-dom';


function App() {
  return (
    <section id='lading-page'>
      <h1 lang="en">Study<span>Card</span></h1>

      <p>
        Olá! Bem-vindo ao projeto <strong>Study<span>Card</span></strong>, um projeto pessoal em constante evolução. Este repositório abriga tanto o frontend quanto o backend, ambos ainda em fase de desenvolvimento. No momento, meu foco principal é implementar autenticação de usuários utilizando <span><a href="https://jwt.io/" target='_blank'>tokens JWT</a></span> e <span><a href="https://github.com/dcodeIO/bcrypt.js/blob/master/README.md" target='_blank'>bcryptjs</a></span>.
      </p>
      <p>
        No backend, utilizamos tecnologias como <span><a href="https://www.postgresql.org/" target='_black'>PostgreSQL</a></span> para o banco de dados e <span><a href="https://expressjs.com/pt-br/" target='_black'>Express.js</a></span> para gerenciamento de rotas. Na parte frontend, construímos a interface do usuário com <span><a href="https://pt-br.legacy.reactjs.org/" target='_black'>React.js</a></span>, estilizamos os componentes com <span><a href="https://sass-lang.com/" target='_blank'>SASS</a></span> e gerenciamos as requisições com <span><a href="https://axios-http.com/ptbr/docs/intro" target='_blank'>Axios</a></span>.
      </p>
      <p>
        Se você está interessado em contribuir ou apenas quer saber mais sobre o projeto, fique à vontade para explorar o código fonte e as instruções de instalação em nosso repositório. Estou sempre aberto a colaborações e feedbacks construtivos. 
      </p>

      <span>Junte-se a nós e ajude a tornar o projeto StudyCard ainda melhor!</span>

      <div className="nav">
        <h2>Realize o login ou cadastres-se na plataforma</h2>
        <ul>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/register">cadastre-se</Link>
          </li>
          <li>
            <Link to="/dashboard">dashboard</Link>
          </li>
        </ul>
      </div>

    </section>
  )
}

export default App
