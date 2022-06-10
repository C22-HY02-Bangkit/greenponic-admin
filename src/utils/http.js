import axios from 'axios';

const Axios = axios.create({
  baseURL:
    import.meta.env.VITE_MODE_ENV === 'dev'
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_API_PROD_URL,
  ResponseType: 'json',
});

// ================ auth-api ================
export const loginAPI = async (data) =>
  await Axios.post('/auth/login', data).then((res) => res.data);

// ================ device-api ================
export const getDevicesAPI = async (token) =>
  await Axios.get('/devices', {
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => res.data?.data);

export const getDeviceDetailAPI = async (token, id) =>
  await Axios.get(`/devices/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => res.data?.data);

export const addDeviceAPI = async (token, data) =>
  await Axios.post('/devices', data, {
    headers: { authorization: `Bearer ${token}` },
  });

export const editDeviceAPI = async (token, data, id) =>
  await Axios.put(`/devices/${id}`, data, {
    headers: { authorization: `Bearer ${token}` },
  });

export const deleteDeviceAPI = async (token, id) =>
  await Axios.delete(`/devices/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });

// ================ user-api ================
export const getUsersAPI = async (token) =>
  await Axios.get('/users', {
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => res.data?.data);

export const getUserDetailAPI = async (token, id) =>
  await Axios.get(`/users/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => res.data?.data);

// ================ product-api ================
export const getProductsAPI = async (token) =>
  await Axios.get('/products', {
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => res.data?.data);

export const getProductDetailAPI = async (token, id) =>
  await Axios.get(`/products/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => res.data?.data);

export const addProductAPI = async (token, data) =>
  await Axios.post('/products', data, {
    headers: { authorization: `Bearer ${token}` },
  });

export const editProductAPI = async (token, data, id) =>
  await Axios.put(`/products/${id}`, data, {
    headers: { authorization: `Bearer ${token}` },
  });

export const deleteProductAPI = async (token, id) =>
  await Axios.delete(`/products/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });

// ================ plant-api ================
export const getPlantsAPI = async (token) =>
  await Axios.get('/plants', {
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => res.data?.data);

export const getPlantDetailAPI = async (token, id) =>
  await Axios.get(`/plants/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => res.data?.data);

export const addPlantAPI = async (token, data) =>
  await Axios.post('/plants', data, {
    headers: { authorization: `Bearer ${token}` },
  });

export const editPlantAPI = async (token, data, id) =>
  await Axios.put(`/plants/${id}`, data, {
    headers: { authorization: `Bearer ${token}` },
  });

export const deletePlantAPI = async (token, id) =>
  await Axios.delete(`/plants/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
