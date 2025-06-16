import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: [true, "Ad alanı zorunludur."], trim: true },
  lastName: { type: String, required: [true, "Soyad alanı zorunludur."], trim: true },
  email: {
    type: String,
    required: [true, "E-posta alanı zorunludur."],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Lütfen geçerli bir e-posta adresi girin."],
  },
  password: {
    type: String,
    required: [true, "Şifre alanı zorunludur."],
    minlength: [6, "Şifre en az 6 karakter olmalıdır."],
    select: false, // Sorgularda varsayılan olarak şifreyi getirme
  },
  avatarUrl: { type: String, default: '' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Item' // Item modelinizin adı neyse o olmalı
    }],
  swapCount: { type: Number, default: 0 },
  bio: { type: String, default: '' },
  location: { type: String, default: '' }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(candidatePwd) {
  return await bcrypt.compare(candidatePwd, this.password);
};

export const User = model('User', userSchema);