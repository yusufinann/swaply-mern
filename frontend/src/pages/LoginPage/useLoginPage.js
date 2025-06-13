import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { useAuth } from '../../shared/context/AuthContext';

export const useLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formLoading, setFormLoading] = useState(false); 

  const navigate = useNavigate();
  const { login, loading: authContextLoading } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('E-posta ve şifre alanları zorunludur.');
      return;
    }

    setFormLoading(true);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      await login(response.data.user, response.data.token);
      navigate('/ana-sayfa');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin veya daha sonra tekrar deneyin.');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleGoogleLogin = async () => {
    // Google login logic
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    error,
    loading: formLoading || authContextLoading,
    handleSubmit,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleGoogleLogin,
    navigate, 
  };
};