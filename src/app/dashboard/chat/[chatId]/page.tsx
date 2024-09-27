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
    roomId: string,
    page: number,
    limit: number
  ) => {
    try {
      let url;
      if (roomId.includes('_')) {
        // Fetch messages between users
        url = `https://workspherebackend.onrender.com/api/messages/users/${senderId}/${receiverId}?page=${page}&limit=${limit}`;
      } else {
        // Fetch messages for a cohort
        url = `https://workspherebackend.onrender.com/api/messages/cohort/${roomId}?page=${page}&limit=${limit}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      console.log("chat data", data);
      return data;
    } catch (error) {
      console.error("Error fetching chat data", error);
      return [];
    }
  };

  const fetchFiles = async (
    senderId: string | null,
    receiverId: string | null,
    roomId: string
  ) => {
    try {
      let url;
      if (roomId.includes('_')) {
        // Fetch files between users
        url = `https://workspherebackend.onrender.com/api/files/${senderId}/${receiverId}`;
      } else {
        // Fetch files for a cohort
        url = `https://workspherebackend.onrender.com/api/files/cohort/${roomId}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      console.log("file data", data);
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching file data", error);
      return [];
    }
  };

 
  return (
    <ChatRoom
      senderId={senderId}
      receiverId={receiverId}
      fetchMessages={(page, limit) => fetchMessages(senderId, receiverId, roomId, page, limit)}
      roomId={roomId}
      name={name}
      isOnline={isOnline}
      fetchFiles={() => fetchFiles(senderId, receiverId, roomId)}
    />
  );
};

export default ChatDetail;