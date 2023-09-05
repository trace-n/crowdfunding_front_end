import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import LandingPage from './components/LandingPage.jsx';
import Homepage from './pages/HomePage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    // element: <NavBar />,
    element: <LandingPage />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/project/:id', element: <ProjectPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap app in router provider to render  */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
