"use client";

import { useEffect } from "react";
import Search from "./Search";
import Chats from "./Chats";
import useChatStore from "@/stores/chat/useChatStore";


const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  //here we will handle getting all the current active chats and the search

  const { recentChats, setRecentChats, socket, addMessage, userId } = useChatStore();

  useEffect(() => {
    console.log("User ID on Dashboard:", userId);
    // You can now use the userId in your dashboard logic
  }, []);

  const fetchRecentChats = async (currentUserId: string | null) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/chats/${currentUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setRecentChats(data);
    } catch (error) {
      console.error("Failed to fetch recent chats:", error);
    }
  };

  useEffect(() => {
    const currentUserId = userId;
    fetchRecentChats(currentUserId);

    // Listen for new messages
    socket.on("newMessage", (roomId: string, message: string) => {
      addMessage(roomId, message);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [userId, socket, addMessage]);

  return (
    <div className="flex h-full">
      <div className="w-1/4 h-full bg-[#e8ebf6] rounded-l-[30px] p-4">
        <Search />
        <div className="text-black font-semibold text-2xl">Chats</div>
        <Chats chats={recentChats} />
      </div>
      <div className="w-3/4">{children}</div>
    </div>
  );
};
export default ChatLayout;
