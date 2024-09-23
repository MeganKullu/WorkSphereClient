// pages/dashboard/chat/[chatId].tsx
"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HiOutlineLink, HiOutlineArrowCircleRight } from "react-icons/hi";
import io from "socket.io-client";

const ChatDetail = ({ params }: { params: { chatId: string } }) => {
  const chatId = params.chatId;
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = io("https://a187-197-237-117-23.ngrok-free.app/");

  let name = searchParams.get("name");
  let encodedSenderId = searchParams.get("senderId");
  let encodedReceiverId = searchParams.get("receiverId");

  // Decode the Base64 encoded senderId and receiverId
  let senderId = encodedSenderId ? atob(encodedSenderId) : null;
  let receiverId = encodedReceiverId ? atob(encodedReceiverId) : null;

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(
        `https://a187-197-237-117-23.ngrok-free.app/api/messages/users/:${senderId}/:${receiverId}`
      );
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();

    socket.emit("join_room", chatId);

    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit("leave_room", chatId);
      socket.disconnect();
    };
  }, [chatId, senderId, receiverId]);

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

  //file upload 

  // const sendFile = (file, senderId, receiverId, cohortId) => {
  //   const reader = new FileReader();
  
  //   reader.onload = (event) => {
  //     const fileBuffer = event.target.result; // Get file as binary buffer
  
  //     socket.emit('send_file', {
  //       senderId,
  //       receiverId,
  //       cohortId,
  //       fileBuffer,
  //       fileName: file.name,
  //       fileType: file.type,
  //     });
  //   };
  
  //   reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
  // };

  // we will call the db with the chat data here and map over
  // here we will also add the chat details

  return (
    <div className="flex h-full w-full gap-2 xl:gap-4">
      <div className="w-2/3 h-full bg-[#e8ebf6] rounded-r-[30px] py-4 px-6 flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between">
            <p className="text-black text-2xl font-semibold">{name}</p>
            <p>{chatId}</p>
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

export default ChatDetail;
