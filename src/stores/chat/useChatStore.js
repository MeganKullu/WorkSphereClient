import { create } from 'zustand';
import io from 'socket.io-client';

const socket = io(`http://localhost:3002`);

const useChatStore = create((set, get) => ({
  messages: {},
  recentChats: [],
  onlineUsers: {},
  socket,

  setRecentChats: (chats) => set({ recentChats: chats }),

  addMessage: (roomId, message, currentUserId) => set((state) => {
    const updatedMessages = {
      ...state.messages,
      [roomId]: [...(state.messages[roomId] || []), message],
    };

    const chatIndex = state.recentChats.findIndex(chat => 
      chat.cohortId === roomId || 
      chat.id === roomId ||
      (chat.sender.id === currentUserId && chat.receiver.id === message.senderId) ||
      (chat.receiver.id === currentUserId && chat.sender.id === message.senderId)
    );

    let updatedRecentChats;

    if (chatIndex !== -1) {
      // Update existing chat
      const updatedChat = {
        ...state.recentChats[chatIndex],
        lastMessage: message,
        unread: message.senderId !== currentUserId,
      };
      updatedRecentChats = [
        updatedChat,
        ...state.recentChats.slice(0, chatIndex),
        ...state.recentChats.slice(chatIndex + 1),
      ];
    } else {
      // Add new chat
      const newChat = {
        id: roomId,
        cohortId: message.cohortId,
        lastMessage: message,
        unread: message.senderId !== currentUserId,
        sender: { id: message.senderId },
        receiver: { id: message.receiverId },
      };
      updatedRecentChats = [newChat, ...state.recentChats];
    }

    return {
      messages: updatedMessages,
      recentChats: updatedRecentChats,
    };
  }),

  setRoomMessages: (roomId, newMessages) => set((state) => ({
    messages: {
      ...state.messages,
      [roomId]: newMessages,
    },
  })),

  updateUserStatus: (userId, isOnline) => set((state) => ({
    onlineUsers: {
      ...state.onlineUsers,
      [userId]: isOnline,
    },
  })),

  markChatAsRead: (roomId, currentUserId) => set((state) => {
    const chatIndex = state.recentChats.findIndex(chat => 
      chat.cohortId === roomId || chat.id === roomId
    );

    if (chatIndex === -1) return state;

    const updatedChat = {
      ...state.recentChats[chatIndex],
      unread: false,
    };

    const updatedRecentChats = [
      ...state.recentChats.slice(0, chatIndex),
      updatedChat,
      ...state.recentChats.slice(chatIndex + 1),
    ];

    return { recentChats: updatedRecentChats };
  }),

  clearUnreadStatus: (roomId) => set((state) => {
    const updatedMessages = state.messages[roomId]?.map(msg => ({
      ...msg,
      read: true
    })) || [];

    return {
      messages: {
        ...state.messages,
        [roomId]: updatedMessages,
      },
    };
  }),
}));

export default useChatStore;