// pages/dashboard/chat/[chatId].tsx
import React from "react";

const ChatDetail = ({ params }: { params: { chatId: string } }) => {
  const chatId = params.chatId;

  // Fetch chat data based on chatId
  // For demonstration, we'll use a placeholder
  // we will call the db with the chat data here and map over
  // here we will also add the chat details

  return (
      <div className="flex h-full w-full gap-2 xl:gap-4">
        <div className="w-2/3 h-full bg-[#e8ebf6] rounded-r-[30px]">
          <p>{chatId}</p>
        </div>
        <div className="w-1/3 h-full flex flex-col gap-2">
         <div className="w-full h-1/2 bg-white rounded-[30px]"></div>
         <div className="w-full h-1/2 bg-[#cdd5ea] rounded-[30px]"></div>
        </div>
      </div>
  
  );
};

export default ChatDetail;
