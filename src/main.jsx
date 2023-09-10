import React from 'react';
import './main.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LandingPage from './components/LandingPage/index.jsx';
import Homepage from './pages/HomePage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import EditUserPage from './pages/EditUserPage.jsx';
// import CreatePledgePage from './pages/CreatePledgePage.jsx';
import CreateProjectPage from './pages/CreateProjectPage.jsx';
import { AuthProvider } from './components/AuthProvider/index.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    // element: <NavBar />,
    element: <LandingPage />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/project/:id', element: <ProjectPage /> },
      { path: '/project', element: <CreateProjectPage /> },  
      // { path: '/pledge/:projectId', element: <CreatePledgePage /> },            
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/users/:id', element: <EditUserPage /> },
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
