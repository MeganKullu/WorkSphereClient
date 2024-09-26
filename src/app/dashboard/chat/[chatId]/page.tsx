// pages/dashboard/chat/[chatId].tsx
"use client";
import React from "react";
import ChatRoom from "./ChatRoom";
import { useSearchParams } from "next/navigation";

const ChatDetail = ({ params }: { params: { roomId: string } }) => {
  const searchParams = useSearchParams();
  let name = searchParams.get("name");
  let encodedSenderId = searchParams.get("encodedSenderId");
  let encodedReceiverId = searchParams.get("encodedReceiverId");
  let isOnline = searchParams.get("isOnline");

  // Decode the Base64 encoded senderId and receiverId
  let senderId = encodedSenderId ? atob(encodedSenderId) : null;
  let receiverId = encodedReceiverId ? atob(encodedReceiverId) : null;

  const generateRoomId = (userId1: string | null, userId2: string | null) => {
    // Convert IDs to strings in case they are numeric
    const [first, second] = [userId1?.toString(), userId2?.toString()].sort();
    return `${first}_${second}`;
  };

  const roomId = generateRoomId(senderId, receiverId);

  const fetchMessages = async (
    senderId: string | null,
    receiverId: string | null,
    page: number,
    limit: number
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/messages/users/${senderId}/${receiverId}?page=${page}&limit=${limit}`
      );

      const data = await response.json();
      console.log("chat data", data);
      return data;
    } catch (error) {
      console.error("Error fetching chat data", error);
      return [];
    }
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
    <ChatRoom
      senderId={senderId}
      receiverId={receiverId}
      fetchMessages={fetchMessages}
      roomId={roomId}
      name={name}
      isOnline={isOnline}
    />
  );
};

export default ChatDetail;
