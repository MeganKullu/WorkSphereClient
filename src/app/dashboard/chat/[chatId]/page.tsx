// pages/dashboard/chat/[chatId].tsx
import React from "react";

const ChatDetail = (
    { params }: { params: { chatId: string } }
) => {

 const chatId = params.chatId;
    
  // Fetch chat data based on chatId
  // For demonstration, we'll use a placeholder
  // we will call the db with the chat data here and map over 
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{chatId}</h1>
   
    </div>
  );
};

export default ChatDetail;
