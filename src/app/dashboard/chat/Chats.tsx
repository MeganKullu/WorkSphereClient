// here we will map over  all over the chats and and a on click function that will update the chat window
// we will use the active buttons
// the routes should be dynamic?
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ChatsProps {
  getAllUsers: () => Promise<Chat[] | undefined>;
}

const Chats = ({ getAllUsers }: ChatsProps) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    getAllUsers().then((data: any) => {
      
      if (data) {
        setChats(data);
      }
    });
  },[currentUserId]);

  const pathname = usePathname();

  return (
    <>
      {/* should be scrollable too */}
      {chats &&
        chats.map((chat: any) => (
          <Link
            key={chat.id}
            href={{
              pathname: `/dashboard/chat/${generateRoomId(currentUserId,receiverId )}`,
              query: { name: chat.firstName, currentUserId, receiverId },
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
                  <p className="text-black text-sm font-semibold">{chat.firstName}</p>
                  <p className="text-black text-sm font-semibold">{chat.lastName}</p>
                </div>
                <p className="text-gray-400 text-xs "></p>
              </div>
              {/* here we truncate the new message */}
              <p className="line-clamp-1 text-sm text-black"></p>
            </div>
          </Link>
        ))}
    </>
  );
};

export default Chats;
