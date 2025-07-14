import { WebSocketServer, WebSocket } from 'ws';
import url from 'url';
import { CommunityChat } from '../models/communityChat.model.js';
import mongoose from 'mongoose';

const clients = new Map();

export const initializeWebSocketServer = (httpServer) => {
    const wss = new WebSocketServer({ server: httpServer });

    wss.on('connection', (ws, req) => {
        const parameters = new url.URL(req.url, `http://${req.headers.host}`).searchParams;
        const userId = parameters.get('userId');

        if (!userId) {
            ws.close();
            return;
        }

        clients.set(userId, ws);
        console.log(`WebSocket client bağlandı: ${userId}`);

        ws.on('message', async (message) => {
            try {
                const data = JSON.parse(message.toString());

                if (data.type === 'chat_message') {
                    const { chatId, text, senderId } = data.payload;

                    if (!chatId || !text || !senderId || senderId !== userId) {
                        return;
                    }

                    const newMessage = {
                        _id: new mongoose.Types.ObjectId(),
                        sender: senderId,
                        text: text,
                        createdAt: new Date(),
                        status: 'sent'
                    };

                    const updatedChat = await CommunityChat.findByIdAndUpdate(
                        chatId,
                        {
                            $push: { messages: newMessage },
                            $set: { lastMessage: newMessage }
                        },
                        { new: true }
                    ).populate('participants', 'firstName lastName avatarUrl');

                    if (!updatedChat) return;

                    const recipient = updatedChat.participants.find(p => p._id.toString() !== senderId);
                    const recipientSocket = recipient ? clients.get(recipient._id.toString()) : null;
                    
                    let finalStatus = 'sent';
                    if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
                        finalStatus = 'delivered';
                        await CommunityChat.updateOne(
                            { _id: chatId, 'messages._id': newMessage._id },
                            { $set: { 'messages.$.status': 'delivered' } }
                        );
                    }
                    
                    const senderInfo = updatedChat.participants.find(p => p._id.toString() === senderId);

                    const messageToSend = {
                        _id: newMessage._id,
                        sender: senderInfo,
                        text: newMessage.text,
                        createdAt: newMessage.createdAt,
                        chatId: chatId,
                        status: finalStatus
                    };

                    updatedChat.participants.forEach(participant => {
                        const pSocket = clients.get(participant._id.toString());
                        if (pSocket && pSocket.readyState === WebSocket.OPEN) {
                            pSocket.send(JSON.stringify({ type: 'new_message', payload: messageToSend }));
                        }
                    });

                } else if (data.type === 'mark_as_read') {
                    const { chatId, readerId } = data.payload;

                    if (!chatId || !readerId || readerId !== userId) {
                        return;
                    }

                    const chatToUpdate = await CommunityChat.findById(chatId);
                    if (!chatToUpdate) return;

                    const messagesToMarkAsRead = chatToUpdate.messages.filter(
                        msg => msg.status !== 'read' && msg.sender.toString() !== readerId
                    );

                    if (messagesToMarkAsRead.length === 0) {
                        return;
                    }

                    const readMessageIds = messagesToMarkAsRead.map(msg => msg._id);

                    await CommunityChat.updateOne(
                        { _id: chatId },
                        { $set: { "messages.$[elem].status": "read" } },
                        {
                            arrayFilters: [
                                { "elem._id": { $in: readMessageIds } }
                            ]
                        }
                    );

                    const chatWithParticipants = await CommunityChat.findById(chatId).populate('participants', '_id');
                    if (!chatWithParticipants) return;

                    chatWithParticipants.participants.forEach(p => {
                        const pSocket = clients.get(p._id.toString());
                        if (pSocket && pSocket.readyState === WebSocket.OPEN) {
                            pSocket.send(JSON.stringify({
                                type: 'messages_read',
                                payload: {
                                    chatId: chatId,
                                    readMessageIds: readMessageIds
                                }
                            }));
                        }
                    });
                }
            } catch (error) {
                console.error('WebSocket mesaj işleme hatası:', error);
            }
        });

        ws.on('close', () => {
            clients.delete(userId);
            console.log(`WebSocket client bağlantısı kapandı: ${userId}`);
        });

        ws.on('error', (error) => {
            console.error(`WebSocket hatası (${userId}):`, error);
        });
    });

    console.log('WebSocket sunucusu başlatıldı ve Express sunucusuna bağlandı.');
};