"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  HiOutlineLink,
  HiOutlineArrowCircleRight,
  HiOutlineArrowCircleDown,
  HiDocument,
} from "react-icons/hi";
import useChatStore from "@/stores/chat/useChatStore";
import FileModal from "./FileModal";
import ImageModal from "./ImageModal";
import { useSession } from "next-auth/react";

const ChatRoom = ({
  senderId,
  receiverId,
  fetchMessages,
  fetchFiles,
  roomId,
  name,
  isOnline,
}: {
  senderId: string | null;
  receiverId: string | null;
  fetchMessages: (page: number, limit: number) => Promise<any>;
  fetchFiles: (page: number, limit: number) => Promise<any>;
  roomId: string;
  name: string | null | undefined;
  isOnline: string | null | undefined;
}) => {
  const { messages, addMessage, setRoomMessages, socket } = useChatStore();
  const [newMessage, setNewMessage] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isUserOnline, setIsUserOnline] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // State for image modal
  const [imageUrl, setImageUrl] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const room_id = roomId;

    const fetchMessageData = async (page: number, limit: number) => {
      try {
        const fetchedMessages = await fetchMessages(page, limit);
        const fetchedFiles = await fetchFiles(page, limit);
        const combinedData = [...fetchedMessages, ...fetchedFiles].sort(
          (a, b) =>
            new Date(a.sentAt || a.createdAt).getTime() -
            new Date(b.sentAt || b.createdAt).getTime()
        );
        setRoomMessages(roomId, combinedData || []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        setRoomMessages(roomId, []);
      }
    };

    fetchMessageData(page, 30);

    socket.emit("join_room", room_id);

    socket.on("receive_message", (message: Message) => {
      addMessage(roomId, message);
      scrollToBottom();
    });

    socket.on(
      "message_delivered",
      ({ messageId, delivered }: { messageId: string; delivered: boolean }) => {
        setRoomMessages((prevMessages: any[]) =>
          prevMessages.map((msg: { id: string }) =>
            msg.id === messageId ? { ...msg, delivered } : msg
          )
        );
      }
    );

    socket.on("messages_read", ({ roomId }: { roomId: string }) => {
      setRoomMessages((prevMessages: any[]) =>
        prevMessages.map((msg: { roomId: string }) =>
          msg.roomId === roomId ? { ...msg, read: true } : msg
        )
      );
    });

    return () => {
      socket.emit("leave_room", roomId);
    };
  }, [roomId, page]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = async () => {
    if (scrollContainerRef.current) {
      const { scrollTop } = scrollContainerRef.current;
      if (scrollTop === 0 && !loading) {
        setLoading(true);
        const newMessages = await fetchMessages(page + 1, 30);
        if (newMessages && newMessages.length > 0) {
          setRoomMessages((prevMessages: any[]) => [
            ...newMessages,
            ...prevMessages,
          ]);
          setPage((prevPage) => prevPage + 1);
        }
        setLoading(false);
      }
    }
  };

  const sendMessage = useCallback(() => {
    if (!newMessage.trim() || !session?.user?.id) return;

    const messageData = {
      id: Date.now().toString(), // or use a proper unique ID generator
      senderId: session.user.id,
      receiverId: receiverId,
      content: newMessage,
      sentAt: new Date().toISOString(),
    };

    socket.emit("send_message", messageData);
    
    addMessage(roomId, messageData, session.user.id);
    setNewMessage("");
    scrollToBottom();
  }, [newMessage, roomId, receiverId, session?.user?.id, addMessage]);
   

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsFileUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("senderId", senderId || "");
      formData.append("receiverId", receiverId || "");
      //formData.append("cohortId", cohortId || ""); we will have to figure this for groups

      try {
        const response = await fetch("http://localhost:3002/api/files/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const uploadedFile = await response.json();
          console.log("File uploaded successfully:", uploadedFile);
          // Display the uploaded file in the chat room window
          const fileMessage: Message = {
            id: uploadedFile.id,
            senderId: uploadedFile.senderId,
            receiverId: uploadedFile.receiverId,
            content: uploadedFile.fileName,
            cohortId: null,
            sendAt: uploadedFile.createdAt,
            delivered: false,
            read: false,
            fileType: uploadedFile.fileType,
            filePath: uploadedFile.filePath,
          };
          addMessage(roomId, fileMessage);
          // Reset state after upload
          setSelectedFile(null);
          setIsModalOpen(false);
          setIsFileUploading(false);
          scrollToBottom();
        } else {
          console.error("Failed to upload file");
          setIsFileUploading(false);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsFileUploading(false);
      }
    }
  };

  const handleImageClick = (url: string) => {
    setImageUrl(url);
    setIsImageModalOpen(true);
  };

  return (
    <div className="flex h-full w-full gap-2 xl:gap-4">
      <div className="w-2/3 h-full bg-[#e8ebf6] rounded-r-[30px] py-4 px-6 flex flex-col">
        <div className="flex justify-between">
          <p className="text-black text-2xl font-semibold">{name}</p>
          <p className="text-black">{isOnline ? "online" : "offline"}</p>
        </div>
        <div
          className="flex-grow mt-4 space-y-4 overflow-y-auto no-scrollbar"
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
                    message.senderId === senderId
                      ? "bg-[#515282] text-white"
                      : " bg-[#d5dbe7] text-black"
                  }`}
                >
                  {message.fileType ? (
                    message.fileType.startsWith("image/") ? (
                      <img
                        src={`http://localhost:3002/${message.filePath}`}
                        alt={message.content}
                        className="w-32 h-32 object-cover rounded-lg"
                        onClick={() =>
                          handleImageClick(
                            `http://localhost:3002/${message.filePath}`
                          )
                        }
                      />
                    ) : (
                      <div className="flex flex-row-reverse justify-between items-center mb-1 gap-4">
                        <a
                          href={`http://localhost:3002/${message.filePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="basis-1/5"
                        >
                          <HiOutlineArrowCircleDown className="size-8 text-[#395290]" />
                        </a>
                        <p className="basis-4/5 text-xs truncate max-w-full bg-slate-400 p-1 rounded-lg flex justify-center items-center">
                          <div className="basis-1/3">
                            <HiDocument className="size-8 text-slate-300" />
                          </div>
                          {(() => {
                            const fileName = message?.filePath
                              ?.split("/")
                              .pop();
                            const fileParts = fileName?.split(".");
                            const name = fileParts?.slice(0, -1).join(".");
                            const extension = fileParts?.slice(-1);
                            return (
                              <>
                                <span className=" basis-2/3 truncate">
                                  {name}
                                </span>
                                {extension && <span>.{extension}</span>}
                              </>
                            );
                          })()}
                        </p>
                      </div>
                    )
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  <div className="flex justify-between gap-4">
                    {message.senderId === senderId && (
                      <p className="text-gray-400 text-xs">
                        {message.read
                          ? "read"
                          : message.delivered
                          ? "✔✔"
                          : "✔"}
                      </p>
                    )}
                    <p className="text-black text-xs">
                      {new Date(message.sendAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="relative">
          <input
            type="text"
            value={newMessage}
            placeholder="Type a message..."
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 py-3 bg-[#d5dbe7] rounded-lg text-sm pr-10 text-black"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 "
          >
            <HiOutlineLink className="text-black size-6" />
          </button>

          <FileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
            onUpload={handleUpload}
            isFileUploading={isFileUploading}
          />

          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 "
            onClick={sendMessage}
          >
            <HiOutlineArrowCircleRight className="text-black size-6" />
          </button>
        </div>
      </div>
      <div className="w-1/3 h-full flex flex-col gap-2">
        <div className="w-full h-1/2 bg-white rounded-[30px] p-4">
          <p className="text-2xl text-black text-center font-semibold">
            Chat Info
          </p>
          <p className="my-2 text-black">Files</p>
        </div>
        <div className="w-full h-1/2 bg-[#cdd5ea] rounded-[30px] p-4">
          <p className="text-2xl text-black text-center font-semibold">
            Group Members
          </p>
          <p className="my-2 text-black">List Members here</p>
        </div>
      </div>
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={imageUrl}
      />
    </div>
  );
};

export default ChatRoom;