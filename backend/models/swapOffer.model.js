import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const messageSubSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const swapOfferSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  offeredItem: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  requestedItem: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Declined', 'Cancelled'], default: 'Pending' },
  messages: [messageSubSchema]
}, { timestamps: true });

swapOfferSchema.statics.findUserOffers = function(userId) {
  return this.find({ $or: [{ sender: userId }, { receiver: userId }] });
};

export const SwapOffer = model('SwapOffer', swapOfferSchema);