import axios from 'axios';

const Axios = axios.create({
  baseURL:
    import.meta.env.VITE_MODE_ENV === 'dev'
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_API_PROD_URL,
  ResponseType: 'json',
});

export const loginAPI = async (data) =>
  await Axios.post('/auth/login', data).then((res) => res.data);
