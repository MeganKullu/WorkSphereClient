import { create } from 'zustand';
import io from 'socket.io-client';

const socket = io(`http://localhost:3002`);

const useChatStore = create((set) => ({
  messages: {},
  recentChats: [],
  onlineUsers: {}, // State for online status
  socket,
  setRecentChats: (chats) => set({ recentChats: chats }),
  addMessage: (roomId, message) => set((state) => {
    const updatedMessages = {
      ...state.messages,
      [roomId]: [...(state.messages[roomId] || []), message],
    };

    // Find the chat in recentChats
    const chatIndex = state.recentChats.findIndex(chat => chat.roomId === roomId);
    let updatedRecentChats;

    if (chatIndex !== -1) {
      // Update the existing chat
      const updatedChat = {
        ...state.recentChats[chatIndex],
        lastMessage: message,
        unread: true,
      };
      updatedRecentChats = [
        updatedChat,
        ...state.recentChats.filter(chat => chat.roomId !== roomId),
      ];
    } else {
      // Add a new chat
      const newChat = {
        roomId,
        lastMessage: message,
        unread: true,
        receiver: { id: roomId.split('_').find(id => id !== state.userId) }, // Assuming userId is available in state
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
}));

export default useChatStore;