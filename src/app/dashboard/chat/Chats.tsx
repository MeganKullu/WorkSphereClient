// here we will map over  all over the chats and and a on click function that will update the chat window
// we will use the active buttons
// the routes should be dynamic?
// remember to encode the room ids then decode them later
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import useUserStore from "@/stores/user/UseUserStore";
import Cookies from "js-cookie";

interface ChatsProps {
  getAllUsers: (currentUserId: string | null) => Promise<Chat[] | undefined>;
}

const Chats = ({ getAllUsers }: ChatsProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const userId = useUserStore((state) => state.userId);

  const currentUserId = userId;
  console.log("currentUserIdChatlayout", currentUserId);

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

  useEffect(() => {
    getAllUsers(currentUserId).then((data: any) => {
      if (data) {
        console.log("chatdata", data);
        setChats(data);
      }
    });
  }, [currentUserId]);

  const pathname = usePathname();

  return (
    <>
      {/* should be scrollable too */}
      {chats &&
        chats.map((chat: any) => {
          const receiverId = chat.id;
          const roomId = generateRoomId(currentUserId, receiverId);
          console.log('roomIdChattsx', roomId);
          const encodedSenderId = encodeId(currentUserId);
          const encodedReceiverId = encodeId(receiverId);

          const setChatData = (name : string, encodedSenderId: string, encodedReceiverId: string, roomId: string) => {
            Cookies.set("chatName", name);
            Cookies.set("senderId", encodedSenderId);
            Cookies.set("receiverId", encodedReceiverId);
            Cookies.set("roomId", roomId);
          };

          setChatData(chat.firstName, encodedSenderId, encodedReceiverId, roomId)

          return (
            <Link
              key={chat.id}
              href={{
                pathname: `/dashboard/chat/${roomId}`,
                // query: {
                //   name: chat.firstName,
                //   senderId: encodedSenderId,
                //   receiverId: encodedReceiverId,
                //   roomId,
                // },
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
                      {chat.firstName}
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
