import { useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Register from './page/Register/Register.jsx';
import Login from './page/Login/Login.jsx';
import Home from './page/Home/Home.jsx';
import './index.css';
import { AuthProvider, AuthContext } from './contexts/contexts.jsx';

const Private = ({ children }) => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div>carregando...</div>
  }

  if (sessionStorage.getItem("authenticated") === null) {
    return window.location.href = '/login';
  }

  return children;
};

const Main = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element:  <App />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/home',
      element: <Private><Home /></Private>
    },
  ]);

  const root = createRoot(document.getElementById('root'));
  root.render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

Main();
