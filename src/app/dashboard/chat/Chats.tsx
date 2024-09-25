// here we will map over  all over the chats and and a on click function that will update the chat window
// we will use the active buttons to show the active chat
// remember to encode the room ids then decode them later
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUserStore from "@/stores/user/UseUserStore";
import useChatStore from "@/stores/chat/useChatStore";

const Chats = () => {
  const userId = useUserStore((state) => state.userId);
  const {
    socket,
    setRoomMessages,
    addMessage,
    updateUserStatus,
    recentChats,
    setRecentChats,
    onlineUsers,
  } = useChatStore();
  const [chats, setChats] = useState([]);
  const currentUserId = userId;

  // Utility function to encode IDs
  const encodeId = (id: string | null) => {
    return id ? Buffer.from(id).toString("base64") : "";
  };

  // Generate the room ID
  const generateRoomId = (userId1: string | null, userId2: string) => {
    const [first, second] = [userId1?.toString(), userId2.toString()].sort();
    return `${first}_${second}`;
  };

  const pathname = usePathname();

  const fetchRecentChats = async (currentUserId: string | null) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/messages/recent/${currentUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      // Sort chats: unread messages first, then by latest message timestamp
      const sortedChats = data.sort((a: any, b: any) => {
        if (a.unread && !b.unread) return -1;
        if (!a.unread && b.unread) return 1;
        return (
          new Date(b.lastMessage.sentAt).getTime() -
          new Date(a.lastMessage.sentAt).getTime()
        );
      });

      setChats(sortedChats);
      setRecentChats(sortedChats);
      console.log("Recent chats:", sortedChats);
    } catch (error) {
      console.error("Failed to fetch recent chats:", error);
    }
  };

  useEffect(() => {
    fetchRecentChats(currentUserId);

    // Listen for new messages
    socket.on("newMessage", (roomId: string, message: string) => {
      addMessage(roomId, message);
    });

    // Listen for online status
    socket.on("user_online", (userId: string) => {
      updateUserStatus(userId, true);
    });

    // Listen for offline status
    socket.on("user_offline", (userId: string) => {
      updateUserStatus(userId, false);
    });

    return () => {
      socket.off("newMessage");
      socket.off("user_online");
      socket.off("user_offline");
    };
  }, [
    socket,
    setRoomMessages,
    addMessage,
    fetchRecentChats,
    updateUserStatus,
    currentUserId,
  ]);

  return (
    <div className="h-full overflow-y-auto">
      <AnimatePresence>
        {recentChats &&
          recentChats.map((chat: any) => {
            const receiverId = chat.receiver?.id || chat.sender?.id;
            const roomId = generateRoomId(currentUserId, receiverId);
            const encodedSenderId = encodeId(currentUserId);
            const encodedReceiverId = encodeId(receiverId);
            const isOnline = onlineUsers[receiverId];
            return (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={{
                    pathname: `/dashboard/chat/${roomId}`,
                    query: {
                      name: chat.receiver?.firstName || chat.sender?.firstName,
                      encodedSenderId,
                      encodedReceiverId,
                      roomId,
                      isOnline: isOnline ? "true" : "false",
                    },
                  }}
                  className={`group rounded-lg py-2 px-3 flex hover:bg-[#d5dbe7] h-16 ${
                    pathname === `dashboard/chat/${roomId}`
                      ? "bg-[#d5dbe7]"
                      : "hover:bg-[#d5dbe7]"
                  }`}
                >
                  <div className="basis-1/4 rounded-lg bg-black">
                    {/* image goes here */}
                  </div>
                  <div className="basis-3/4 mx-2">
                    <div className="flex justify-between mb-1">
                      <div className="flex gap-1">
                        <p className="text-black text-sm font-bold">
                          {chat.receiver?.firstName || chat.sender?.firstName}
                        </p>
                        <p className="text-black text-sm font-semibold">
                          {chat.lastName}
                        </p>
                      </div>
                      <p className="text-gray-400 text-xs">
                        {new Date(chat.lastMessage.sentAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <p className="line-clamp-1 text-xs text-black">
                      {chat.lastMessage.content}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
};

export default Chats;
