import React from "react";
import Search from "./Search";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <div className="w-1/4 h-full bg-[#e8ebf6] rounded-l-[30px] p-4">
       <Search/>
      </div>
      <div className="w-3/4">{children}</div>
    </div>
  );
};
export default ChatLayout;
