import { create }from 'zustand';
import io from 'socket.io-client';

const socket = io(`http://localhost:3002`);

const useChatStore = create((set) => ({
  messages: {},
  recentChats: [],
  socket,
  setRecentChats: (chats) => set({ recentChats: chats }),
  addMessage: (roomId, message) => set((state) => ({
    messages: {
      ...state.messages,
      [roomId]: [...(state.messages[roomId] || []), message],
    },
  })),
  setRoomMessages: (roomId, newMessages) => set((state) => ({
    messages: {
      ...state.messages,
      [roomId]: newMessages,
    },
  })),
}));

export default useChatStore;