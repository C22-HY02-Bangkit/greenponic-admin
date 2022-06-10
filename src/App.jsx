import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './css/style.scss';

import './charts/ChartjsConfig';

// import HOC component
import ProtectedRoute from './Components/ProtectedRoute';
import AuthRoute from './Components/AuthRoute';

// Import pages
import Dashboard from './pages/Dashboard';
import Device from './pages/Device';
import Plant from './pages/Plant';
import Product from './pages/Product';
import User from './pages/User';
import Login from './pages/Login';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/device" element={<Device />} />
          <Route exact path="/plant" element={<Plant />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/user" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
