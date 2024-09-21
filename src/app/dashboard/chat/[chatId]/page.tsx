// pages/dashboard/chat/[chatId].tsx
"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

const ChatDetail = ({ params }: { params: { chatId: string } }) => {
  const chatId = params.chatId;
  const searchParams = useSearchParams();

  let name = searchParams.get("name");

  const dummyMessages = [
    {
      id: 1,
      sender: "Alice",
      text: "Hey Bob, how are you?",
      timestamp: "10:00 AM",
    },
    {
      id: 2,
      sender: "Bob",
      text: "I'm good, Alice. How about you?",
      timestamp: "10:02 AM",
    },
    {
      id: 3,
      sender: "Alice",
      text: "I'm doing well, thanks! Have you seen the latest design?",
      timestamp: "10:05 AM",
    },
    {
      id: 4,
      sender: "Bob",
      text: "Yes, I have. It looks great!",
      timestamp: "10:07 AM",
    },
  ];

  // Fetch chat data based on chatId
  // For demonstration, we'll use a placeholder
  // we will call the db with the chat data here and map over
  // here we will also add the chat details

  return (
    <div className="flex h-full w-full gap-2 xl:gap-4">
      <div className="w-2/3 h-full bg-[#e8ebf6] rounded-r-[30px] py-4 px-6">
        <div>
          <div className="flex justify-between">
            <p className="text-black text-2xl font-semibold">{name}</p>
            <p>{chatId}</p>
          </div>
          <div className="mt-4 space-y-4">
            {dummyMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "Alice" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    message.sender === "Alice"
                      ? "bg-[#d5dbe7] text-black"
                      : "bg-[#515282] text-white"
                  }`}
                >
                  <p className="font-bold text-sm">{message.sender}</p>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-gray-400 text-sm">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/3 h-full flex flex-col gap-2">
        <div className="w-full h-1/2 bg-white rounded-[30px]"></div>
        <div className="w-full h-1/2 bg-[#cdd5ea] rounded-[30px]"></div>
      </div>
    </div>
  );
};

export default ChatDetail;
