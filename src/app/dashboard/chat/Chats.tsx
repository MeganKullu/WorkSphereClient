// here we will map over  all over the chats and and a on click function that will update the chat window
// we will use the active buttons
// the routes should be dynamic?
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const dummyChats = [
  {
    id: "1",
    name: "Design Chat",
    lastMessage: "How are you today",
    timestamp: "4m",
  },
  {
    id: "2",
    name: "Development Chat",
    lastMessage: "The new feature is ready",
    timestamp: "10m",
  },
  {
    id: "3",
    name: "Marketing Chat",
    lastMessage: "The campaign was successful",
    timestamp: "1h",
  },
];

const Chats = () => {
  useEffect(() => {
    const getAllUsers = async () => {
      const response = await fetch(`http://192.168.0.15:3002/api/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("all users", response);
    };

    getAllUsers();
  });
  const pathname = usePathname();

  return (
    <>
      {/* should be scrollable too */}
      {dummyChats.map((chat) => (
        <Link
          key={chat.id}
          href={{
            pathname: `/dashboard/chat/${chat.id}`,
            query: { name: chat.name },
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
              <p className="text-sm font-semibold text-black">{chat.name}</p>
              <p className="text-gray-400 text-xs ">{chat.timestamp}</p>
            </div>
            {/* here we truncate the new message */}
            <p className="line-clamp-1 text-sm text-black">
              {chat.lastMessage}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Chats;
