// here we will map over  all over the chats and and a on click function that will update the chat window
// we will use the active buttons
// the routes should be dynamic?
// remember to encode the room ids then decode them later
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useUserStore from "@/stores/user/UseUserStore";
import useChatStore from "@/stores/chat/useChatStore";

const Chats = () => {
  const userId = useUserStore((state) => state.userId);
  const { socket, setRoomMessages, addMessage } = useChatStore();
  const [chats, setChats] = useState([]);
  const currentUserId = userId;

  // Utility function to encode IDs

  const encodeId = (id: string | null) => {
    return id ? Buffer.from(id).toString("base64") : "";
  };

  //generateTheRoomId

  const generateRoomId = (userId1: string | null, userId2: string) => {
    // Convert IDs to strings in case they are numeric

    const [first, second] = [userId1?.toString(), userId2.toString()].sort();
    return `${first}_${second}`;
  };

  const pathname = usePathname();

  useEffect(() => {
    // Listen for new messages
    socket.on("newMessage", (roomId: any, message: any) => {
      setRoomMessages(roomId, (prevMessages: any) => [
        ...prevMessages,
        message,
      ]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, setRoomMessages]);

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
        return new Date(b.lastMessage.sentAt).getTime() - new Date(a.lastMessage.sentAt).getTime();
      });

      setChats(sortedChats);
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

    return () => {
      socket.off("newMessage");
    };
  }, [userId, socket, addMessage]);

  return (
    <>
      {/* should be scrollable too */}
      {chats &&
        chats.map((chat: any) => {
          const receiverId = chat.receiver?.id || chat.sender?.id;
          const roomId = generateRoomId(currentUserId, receiverId);
          const encodedSenderId = encodeId(currentUserId);
          const encodedReceiverId = encodeId(receiverId);
          return (
            <Link
              key={chat.id}
              href={{
                pathname: `/dashboard/chat/${roomId}`,
                query: {
                  name: chat.receiver?.firstName || chat.sender?.firstName,
                  encodedSenderId,
                  encodedReceiverId,
                  roomId,
                },
              }}
              className={`group rounded-lg py-2 px-3 flex hover:bg-[#d5dbe7] h-16 ${
                pathname === `dashboard/chat/${chat.id}`
                  ? "bg-[#d5dbe7]"
                  : "hover:bg-[#d5dbe7]"
              }`}
            >
              <div className="basis-1/4 rounded-lg bg-black">
                {/* image goes here */}
              </div>
              <div className="basis-3/4 mx-2">
                {/* name of the use/group goes here */}
                <div className="flex justify-between mb-1">
                  {/* here the time stamp */}
                  <div className="flex gap-1">
                    <p className="text-black text-sm font-semibold">
                      {chat.receiver?.firstName || chat.sender?.firstName}
                    </p>
                    <p className="text-black text-sm font-semibold">
                      {chat.lastName}
                    </p>
                  </div>
                  <p className="text-gray-400 text-xs "></p>
                </div>
                {/* here we truncate the new message */}
                <p className="line-clamp-1 text-sm text-black"></p>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default Chats;
