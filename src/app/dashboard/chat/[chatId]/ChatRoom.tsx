// pages/dashboard/chat/[chatId].tsx
"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { HiOutlineLink, HiOutlineArrowCircleRight } from "react-icons/hi";
import { format } from "date-fns";
import useChatStore from "@/stores/chat/useChatStore";

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
    senderId: string | null,
    receiverId: string | null,
    page: number,
    limit: number,
  ) => Promise<any>;
  roomId: string ;
  name: string | null | undefined;
}) => {
  const { messages, addMessage, setRoomMessages, socket } = useChatStore();
  const [newMessage, setNewMessage] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Inside the ChatRoom component
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return format(date, "h:mm a");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  useEffect(() => {
    const room_id = roomId;
    const sender_id = senderId;
    const receiver_id = receiverId;

    const fetchMessageData = async (
      senderId: string | null,
      receiverId: string | null,
      page: number,
      limit: number,
    ) => {
      try {
        const fetchedMessages = await fetchMessages(senderId, receiverId, page, limit);
        setRoomMessages(roomId, fetchedMessages || []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        setRoomMessages(roomId, []);
      }
    };

    fetchMessageData(sender_id, receiver_id, page, 30);

    socket.emit("join_room", room_id);

    socket.on("receive_message", (message: Message) => {
      addMessage(roomId, message);
      scrollToBottom();
    });

    // socket.on("message_delivered", ({ messageId, delivered }) => {
    //     setMessages((prevMessages) =>
    //       prevMessages.map((msg) =>
    //         msg.id === messageId ? { ...msg, delivered } : msg
    //       )
    //     );
    //   });
    return () => {
      socket.emit("leave_room", roomId);
    };
  }, [roomId, senderId, receiverId, page]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop } = scrollContainerRef.current;
      if (scrollTop === 0 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };


  const sendMessage = () => {
    const messageData: Message = {
      senderId, // will be the id of the current logged in user
      receiverId, // will be the id of the receiver
      content: newMessage,
      cohortId: null, // Replace with actual cohort ID if applicable
      sendAt: new Date().toISOString(),
      delivered: false,
    };

    addMessage(roomId, {
      ...messageData,
      id: Date.now().toString(),
      sendAt: new Date().toISOString(),
    });

    socket.emit("send_message", messageData);
    setNewMessage("");
    scrollToBottom();
  };

  return (
    <div className="flex h-full w-full gap-2 xl:gap-4">
      <div className="w-2/3 h-full bg-[#e8ebf6] rounded-r-[30px] py-4 px-6 flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between">
            <p className="text-black text-2xl font-semibold">{name}</p>
          </div>
          <div
            className="flex-grow mt-4 space-y-4 overflow-y-auto"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {messages[roomId]?.length === 0 ? (
              <p>No messages yet.</p>
            ) : (
              messages[roomId]?.map((message: Message) => (
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
                    <p className="text-gray-400 text-sm">
                      {formatTime(message.sendAt)}
                    </p>
                    {message.senderId === senderId && (
                      <p className="text-gray-400 text-sm">
                        {message.delivered ? "✔✔" : "✔"}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
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
            {/* <input
              type="file"
              // onChange={handleFileUpload}
              className="flex "
            /> */}
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
