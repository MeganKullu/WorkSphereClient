// pages/dashboard/chat/[chatId].tsx
import React from "react";

const ChatDetail = (
    { params }: { params: { chatId: string } }
) => {

 const chatId = params.chatId;
    
  // Fetch chat data based on chatId
  // For demonstration, we'll use a placeholder
  const chatData = {
    id: chatId,
    name: "Design Chat",
    messages: [
      {
        id: 1,
        text: "How are you today hope you are doing well.",
        timestamp: "4m",
      },
      // Add more messages here
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{chatData.name}</h1>
      <div className="mt-4">
        {chatData.messages.map((message) => (
          <div key={message.id} className="mb-2">
            <p>{message.text}</p>
            <p className="text-gray-400 text-sm">{message.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatDetail;
