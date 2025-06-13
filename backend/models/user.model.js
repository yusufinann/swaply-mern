import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /.+@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  avatarUrl: { type: String, default: '' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
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

userSchema.methods.comparePassword = function(candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

export const User = model('User', userSchema);
