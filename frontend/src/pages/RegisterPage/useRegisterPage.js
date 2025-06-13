import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { useAuth } from '../../shared/context/AuthContext';

export const useRegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login: contextLogin, loading: authLoading } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Tüm zorunlu alanlar doldurulmalıdır.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }
    if (!agreeToTerms) {
      setError('Kullanım koşullarını ve gizlilik politikasını kabul etmelisiniz.');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword, 
      });

      console.log('Registration successful:', response.data);
      await contextLogin(response.data.user, response.data.token);
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err.response || err.message);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin veya daha sonra tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
  const handleMouseDownConfirmPassword = (event) => event.preventDefault();

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    console.log('Google ile kayıt/giriş yapılıyor...');
    setTimeout(() => {
        setError('Google ile kayıt özelliği henüz aktif değil.');
        setLoading(false);
    }, 1500);
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    agreeToTerms,
    setAgreeToTerms,
    showPassword,
    showConfirmPassword,
    error,
    loading: loading || authLoading,
    handleSubmit,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleClickShowConfirmPassword,
    handleMouseDownConfirmPassword,
    handleGoogleLogin,
    navigate,
  };
};