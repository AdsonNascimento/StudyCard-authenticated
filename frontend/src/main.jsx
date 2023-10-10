import { useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './page/Home/';
import Register from './page/Register/';
import Login from './page/Login/';
import Dashboard from './page/Dashboard/';
import './index.scss';
import { AuthProvider, AuthContext } from './contexts/contexts.jsx';

const Private = ({ children }) => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div>carregando...</div>
  }

  if (localStorage.getItem("authenticated") === null) {
    return window.location.href = '/login';
  }

  return children;
};

const Main = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element:  <Home />,
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
      path: '/dashboard',
      element: <Private><Dashboard /></Private>
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
