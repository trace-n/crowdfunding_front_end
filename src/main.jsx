import React from 'react';
import './main.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LandingPage from './components/LandingPage/index.jsx';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EditUserPage from './pages/EditUserPage';
import MyProjectsPage from './pages/MyProjectsPage';
import MyPledgesPage from  './pages/MyPledgesPage';
import EditPledgePage from './pages/EditPledgePage';
import EditProjectPage from './pages/EditProjectPage';
import CreateProjectPage from './pages/CreateProjectPage';
import { AuthProvider } from './components/AuthProvider/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/project/:id', element: <ProjectPage /> },
      { path: '/project', element: <CreateProjectPage /> },  
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/users/:id', element: <EditUserPage /> },
      { path: '/projects', element: <MyProjectsPage /> },
      { path: '/pledges', element: <MyPledgesPage /> },
      { path: '/pledges/:id', element: <EditPledgePage /> },
      { path: '/editProject/:id', element: <EditProjectPage /> },  
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    {/* Wrap app in router provider to render  */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
