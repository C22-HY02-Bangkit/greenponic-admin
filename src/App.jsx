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
import CreateDevice from './pages/CreateDevice';
import EditDevice from './pages/EditDevice';
import CreatePlant from './pages/CreatePlant';
import EditPlant from './pages/EditPlant';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import UserDetail from './pages/UserDetail';
import PlantDetail from './pages/PlantDetail';

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
          {/* device route */}
          <Route exact path="/device" element={<Device />} />
          <Route exact path="/device/create" element={<CreateDevice />} />
          <Route exact path="/device/edit/:id" element={<EditDevice />} />

          {/* plant route */}
          <Route exact path="/plant" element={<Plant />} />
          <Route exact path="/plant/detail/:id" element={<PlantDetail />} />
          <Route exact path="/plant/create" element={<CreatePlant />} />
          <Route exact path="/plant/edit/:id" element={<EditPlant />} />

          {/* product route */}
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/product/create" element={<CreateProduct />} />
          <Route exact path="/product/edit/:id" element={<EditProduct />} />

          {/* user route */}
          <Route exact path="/user" element={<User />} />
          <Route exact path="/user/detail/:id" element={<UserDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
