import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  images: [{ type: String }],
  category: { type: String, enum: ['Books', 'Electronics', 'Clothing', 'Other'], default: 'Other' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Available', 'Pending', 'Swapped'], default: 'Available' },
  location: { type: String, default: '' },
  tags: [{ type: String }]
}, { timestamps: true });

export const Item = model('Item', itemSchema);