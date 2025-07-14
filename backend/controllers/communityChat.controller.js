import { CommunityChat } from '../models/communityChat.model.js';
import { Item } from '../models/item.model.js';
import mongoose from 'mongoose';


export const getMyChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await CommunityChat.find({
      participants: userId,
      'messages.0': { $exists: true }
    })
      .populate({
        path: 'participants',
        select: 'firstName lastName avatarUrl'
      })
      .populate({
        path: 'item',
        select: 'title images'
      })
      .populate({
          path: 'lastMessage.sender',
          select: 'firstName lastName'
      })
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, data: chats });
  } catch (error) {
    console.error('Get My Chats Error:', error);
    res.status(500).json({ success: false, message: 'Sohbetler getirilirken bir hata oluştu.' });
  }
};


export const getOrCreateChat = async (req, res) => {
  try {
    const { itemId } = req.body;
    const requesterId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ success: false, message: 'Geçersiz ürün ID.' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Ürün bulunamadı.' });
    }

    const ownerId = item.owner;
    
    let chat = await CommunityChat.findOne({
      item: itemId,
      participants: { $all: [requesterId, ownerId] }
    })
    .populate('participants', 'firstName lastName avatarUrl')
    .populate('item', 'title images')
    // EKLENMESİ GEREKEN SATIR BURASI:
    .populate({
        path: 'messages.sender',
        select: 'firstName lastName avatarUrl'
    });

    if (!chat) {
      chat = new CommunityChat({
        item: itemId,
        participants: [requesterId, ownerId],
        messages: []
      });
      await chat.save();
      await chat.populate('participants', 'firstName lastName avatarUrl');
      await chat.populate('item', 'title images');
    }

    res.status(200).json({ success: true, data: chat });

  } catch (error) {
    console.error('Get or Create Chat Error:', error);
    res.status(500).json({ success: false, message: 'Sohbet başlatılırken bir hata oluştu.' });
  }
};

export const getChatMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({ success: false, message: 'Geçersiz sohbet ID.' });
        }
        
        const chat = await CommunityChat.findById(chatId)
            .populate({
                path: 'messages.sender',
                select: 'firstName lastName avatarUrl'
            });

        if (!chat) {
            return res.status(404).json({ success: false, message: 'Sohbet bulunamadı.' });
        }

    
        if (!chat.participants.includes(userId)) {
            return res.status(403).json({ success: false, message: 'Bu sohbete erişim yetkiniz yok.' });
        }

        res.status(200).json({ success: true, data: chat.messages });

    } catch (error) {
        console.error('Get Chat Messages Error:', error);
        res.status(500).json({ success: false, message: 'Mesajlar getirilirken bir hata oluştu.' });
    }
}

export const getChatById = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({ success: false, message: 'Geçersiz sohbet ID.' });
        }

        const chat = await CommunityChat.findById(chatId)
            .populate('participants', 'firstName lastName avatarUrl')
            .populate({
                path: 'item',
                select: 'title images owner', 
                populate: { 
                    path: 'owner',
                    select: 'firstName lastName' 
                }
            })
            .populate({
                path: 'messages.sender',
                select: 'firstName lastName avatarUrl'
            });

        if (!chat) {
            return res.status(404).json({ success: false, message: 'Sohbet bulunamadı.' });
        }

        if (!chat.participants.some(p => p._id.equals(userId))) {
            return res.status(403).json({ success: false, message: 'Bu sohbete erişim yetkiniz yok.' });
        }

        res.status(200).json({ success: true, data: chat });

    } catch (error) {
        console.error('Get Chat By ID Error:', error);
        res.status(500).json({ success: false, message: 'Sohbet verileri getirilirken bir hata oluştu.' });
    }
};