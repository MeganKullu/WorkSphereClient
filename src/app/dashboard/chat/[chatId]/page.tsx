// pages/dashboard/chat/[chatId].tsx

import React from "react";
import ChatRoom from "./ChatRoom";
import { cookies } from "next/headers";

const ChatDetail = ({ params }: { params: { roomId: string } }) => {
  
  const cookieStore = cookies();
  const name = cookieStore.get('chatName')?.value;
  const encodedSenderId = cookieStore.get('senderId')?.value;
  const encodedReceiverId = cookieStore.get('receiverId')?.value;
  const roomId = cookieStore.get("roomId")?.value;
 

  // Decode the Base64 encoded senderId and receiverId
  let senderId = encodedSenderId ? atob(encodedSenderId) : null;
  let receiverId = encodedReceiverId ? atob(encodedReceiverId) : null;

  const fetchMessages = async (
    senderId: string | null,
    receiverId: string | null
  ) => {
    "use server";

    try {
      console.log("fetchfnSender", senderId);
      console.log("fetchfnReceiver", receiverId);
      const response = await fetch(
        `https://3266-197-237-117-23.ngrok-free.app/api/messages/users/${senderId}/${receiverId}`
      );

      const data = await response.json();
      console.log("chat data", data);

      return data;
    } catch (error) {
      console.error("Error fetching chat data", error);
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
    />
  );
};

export default ChatDetail;
