// here we will map over  all over the chats and and a on click function that will update the chat window
// we will use the active buttons to show the active chat
// remember to encode the room ids then decode them later
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useChatStore from "@/stores/chat/useChatStore";

const Chats = ({ userId }: { userId: string | undefined }) => {

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
  const encodeId = (id: string | null | undefined) => {
    return id ? Buffer.from(id).toString("base64") : "";
  };

  // Generate the room ID
  const generateRoomId = (userId1: string | null | undefined, userId2: string | null | undefined) => {
    if (!userId1 || !userId2) {
      console.error("Invalid user IDs for room generation:", userId1, userId2);
      return null;
    }
    const [first, second] = [userId1, userId2].sort();
    return `${first}_${second}`;
  };

  const pathname = usePathname();

  const fetchRecentChats = useCallback(async (currentUserId: string | null | undefined) => {
    if (!currentUserId) return;
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
  }, [setRecentChats]);

  useEffect(() => {
    if (currentUserId) {
      fetchRecentChats(currentUserId);
    }
  }, [currentUserId, fetchRecentChats]);

  useEffect(() => {
    // Listen for new messages
    // socket.on("newMessage", (roomId: string, message: string) => {
    //   addMessage(roomId, message);
    // });

    socket.on("newMessage", (roomId: string, message: any) => {
      addMessage(roomId, message);
      // Update recentChats to include the new message
      setRecentChats((prevChats: any) => {
        const chatIndex = prevChats.findIndex((chat: { roomId: string; }) => chat.roomId === roomId);
        
        let updatedChats;
        if (chatIndex !== -1) {
          // Update the existing chat with the new message
          const updatedChat = {
            ...prevChats[chatIndex],
            lastMessage: message,
            lastMessageSentAt: new Date().toISOString(),
          };

          // Create a new array with the updated chat at the correct index
          updatedChats = [
            ...prevChats.slice(0, chatIndex),
            updatedChat,
            ...prevChats.slice(chatIndex + 1),
          ];
        } else {
          // If the chat doesn't exist, add it as a new chat
          const newChat = {
            roomId,
            lastMessage: message,
            lastMessageSentAt: new Date().toISOString(),
          };
          updatedChats = [newChat, ...prevChats];
        }

        // Sort chats: unread messages first, then by latest message timestamp
        return updatedChats.sort((a, b) => {
          if (a.unread && !b.unread) return -1;
          if (!a.unread && b.unread) return 1;
          return new Date(b.lastMessageSentAt).getTime() - new Date(a.lastMessageSentAt).getTime();
        });
      });
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
  }, [socket, addMessage, updateUserStatus]);


  return (
    <div className="h-full overflow-y-auto">
      {/* getting meesges between users in now fetching the same id we need to check on that */}
      <AnimatePresence initial={false}>
        {recentChats &&
          recentChats.map((chat: any) => {
            const isCohortChat = chat.cohortId !== null;
          
             
            let otherUser;
            
            if (isCohortChat) {
              // For cohort chats, you can set otherUser based on cohort details
              otherUser = {
                id: chat.cohortId, // Use cohortId as the ID
                firstName: chat.cohort?.name || "Cohort", // Fallback name if cohort name is not available
                lastName: "", // Cohorts may not have a last name
                // Add any other necessary properties
              };
            } else {
              // For one-on-one chats, determine the other user based on sender/receiver
              otherUser = chat.sender?.id === currentUserId ? chat.receiver : chat.sender;
            }
        
            // Ensure otherUser is not null
            if (!otherUser) {
              console.warn("Other user is null for chat:", chat);
              return null; // Skip rendering this chat if otherUser is null
            }
            const roomId = isCohortChat
              ? chat.cohortId
              : generateRoomId(currentUserId, otherUser.id);
            const encodedSenderId = encodeId(currentUserId);
            const encodedReceiverId = encodeId(otherUser.id);
            const isOnline = onlineUsers[otherUser.status];

            //Create a unique key using a combination of the roomId and the otherUser.id
            const uniqueKey = `${roomId}-${chat.lastMessage.sentAt}`;

            return (
              <motion.div
                key={uniqueKey}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={{
                    pathname: `/dashboard/chat/${roomId}`,
                    query: {
                      name: isCohortChat ? chat.cohort?.name : otherUser.firstName, // we need to correct this such that the name is not the current users name and oly either the other party whocould be the sender or the receiver
                      encodedSenderId,
                      encodedReceiverId,
                      roomId,
                      isOnline: isOnline ? "true" : "false",
                    },
                  }}
                  className={`group rounded-lg py-2 px-3 flex hover:bg-[#d5dbe7] mb-1 ${
                    pathname === `/dashboard/chat/${roomId}`
                      ? "bg-[#d5dbe7]"
                      : "hover:bg-[#d5dbe7]"
                  }`}
                >
                  <div className="w-14 h-14 rounded-lg bg-black">
                    {/* image goes here */}
                  </div>
                  <div className="basis-3/4 mx-2">
                    <div className="flex justify-between mb-1">
                      <div className="flex gap-1">
                        <p className="text-black text-sm font-bold">
                          {otherUser.firstName}
                          {/* also here we need to add the appropriate chat name  */}
                        </p>
                        <p className="text-black text-sm font-semibold">
                          {otherUser.lastName}
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
