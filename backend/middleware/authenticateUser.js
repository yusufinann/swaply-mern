import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"; // Model importunu düzelt
import config from "../config/config.js";

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.authToken) {
      token = req.cookies.authToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Yetkilendirme hatası. Lütfen giriş yapın."
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret);

    const user = await User.findById(decoded.id); // Password zaten select:false

    if (!user) {
      return res.status(401).json({ // 404 yerine 401 daha uygun olabilir
        success: false,
        message: "Kullanıcı bulunamadı veya token geçersiz."
      });
    }

    req.user = user;
    next();
  } catch (error) {
    let statusCode = 500;
    let message = "Kimlik doğrulama sırasında bir hata oluştu.";

    if (error.name === 'JsonWebTokenError') {
      statusCode = 401;
      message = "Geçersiz token.";
    } else if (error.name === 'TokenExpiredError') {
      statusCode = 401;
      message = "Token süresi dolmuş. Lütfen tekrar giriş yapın.";
    }
    console.error('Authentication error:', error.name, error.message);
    return res.status(statusCode).json({ success: false, message });
  }
};

export default authenticateUser;