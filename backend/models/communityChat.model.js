import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: { 
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent'
    }
}, {
  _id: true
});

const communityChatSchema = new Schema({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],

  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },

  messages: [messageSchema],
  
  lastMessage: {
      type: messageSchema
  }

}, {
  timestamps: true
});

communityChatSchema.index({ participants: 1 });
communityChatSchema.index({ item: 1 });

export const CommunityChat = model('CommunityChat', communityChatSchema);