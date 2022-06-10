import { useState, createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { loginAPI } from '../utils/http';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    try {
      setError('');
      const response = await loginAPI(data);

      if (response) {
        const resData = response.data;
        const adminData = {
          id: resData.admin_id,
          username: resData.username,
        };

        setUser(adminData);
        setToken(resData.token);
      }
    } catch (error) {
      setError(error.response.data?.message);
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const value = useMemo(
    () => ({
      user,
      error,
      token,
      login,
      logout,
    }),
    [user, error, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
