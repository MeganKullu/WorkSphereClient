// pages/dashboard/chat/[chatId].tsx
"use client";
import React from "react";
import { useEffect, useState } from "react";
import { HiOutlineLink, HiOutlineArrowCircleRight } from "react-icons/hi";
import io from "socket.io-client";

const ChatRoom = ({
  senderId,
  receiverId,
  fetchMessages,
  roomId,
  name,
}: {
  senderId: string | null;
  receiverId: string | null;
  fetchMessages: (
    senderId : string | null,
    receiverId : string | null,
  ) => Promise<any>;
  roomId: string | null;
  name: string | null,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = io("https://a187-197-237-117-23.ngrok-free.app/");

  useEffect(() => {

    const fetchMessageData = async() => {
       const messages = await fetchMessages(senderId, receiverId);
       setMessages(messages);
    }
    
    fetchMessageData();
   
    socket.emit("join_room", roomId);

    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  });
  // here we will import the fetch function

  // fetchMessages();
  const sendMessage = () => {
    const messageData = {
      senderId, // will be the id of the current logged in user
      receiverId, // will be the id of the receiver
      message: newMessage,
      cohortId: null, // Replace with actual cohort ID if applicable
    };

    socket.emit("send_message", messageData);
    setNewMessage("");
  };

  return (
    <div className="flex h-full w-full gap-2 xl:gap-4">
      <div className="w-2/3 h-full bg-[#e8ebf6] rounded-r-[30px] py-4 px-6 flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between">
            <p className="text-black text-2xl font-semibold">{name}</p>
            <p>{roomId}</p>
          </div>
          <div className="flex-grow mt-4 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === senderId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    message.receiverId === senderId
                      ? "bg-[#d5dbe7] text-black"
                      : "bg-[#515282] text-white"
                  }`}
                >
                  <p className="font-bold text-sm">{}</p>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-gray-400 text-sm">{message.sendAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto relative">
          <input
            type="text"
            placeholder="Type a message..."
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full pl-10 py-3 bg-[#d5dbe7] rounded-lg text-sm pr-10 text-black"
          />
          <button className="absolute left-3 top-1/2 transform -translate-y-1/2 ">
            <HiOutlineLink className="text-black size-6" />
            <input
              type="file"
              // onChange={handleFileUpload}
              className="flex "
            />
          </button>
          {/* this will be the button to send the data */}
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 "
            onClick={sendMessage}
          >
            <HiOutlineArrowCircleRight className="text-black size-6" />
          </button>
        </div>
      </div>
      <div className="w-1/3 h-full flex flex-col gap-2">
        <div className="w-full h-1/2 bg-white rounded-[30px]"></div>
        <div className="w-full h-1/2 bg-[#cdd5ea] rounded-[30px]"></div>
      </div>
    </div>
  );
};

export default ChatRoom;
