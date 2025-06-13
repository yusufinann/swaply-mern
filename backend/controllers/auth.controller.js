import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const generateToken = (id) => {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + config.jwt.cookieExpiresInDays * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (config.env === 'production') {
    options.secure = true;
  }

  const userResponse = { ...user._doc };
  delete userResponse.password;


  res
    .status(statusCode)
    .cookie('authToken', token, options)
    .json({
      success: true,
      token,
      user: userResponse,
    });
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Lütfen tüm zorunlu alanları doldurun.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Şifreler eşleşmiyor.' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'Bu e-posta adresi zaten kayıtlı.' });
    }

    user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    sendTokenResponse(user, 201, res);

  } catch (error) {
    console.error('Register Error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Sunucu hatası. Kayıt işlemi başarısız.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Lütfen e-posta ve şifrenizi girin.' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Geçersiz e-posta veya şifre.' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Geçersiz e-posta veya şifre.' });
    }

    sendTokenResponse(user, 200, res);

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Sunucu hatası. Giriş işlemi başarısız.' });
  }
};

export const getMe = async (req, res) => {
  // Bu fonksiyon authenticateUser middleware'i ile çağrıldığında req.user dolu olacaktır.
  res.status(200).json({
    success: true,
    user: req.user
  });
};

export const logout = async (req, res) => {
    res.cookie('authToken', 'none', {
        expires: new Date(Date.now() + 10 * 1000), // 10 saniye sonra cookie silinsin
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'Başarıyla çıkış yapıldı.'
    });
};