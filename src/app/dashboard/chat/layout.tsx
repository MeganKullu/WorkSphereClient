import React from "react";
import Search from "./Search";
import Chats from "./Chats";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {

  //here we will handle getting all the current active chats and the search

  const getAllUsers = async (currentUserId: string | null) => {
    "use server";

    const response = await fetch(`https://a25b-105-160-57-244.ngrok-free.app/api/users/?currentUserId=${currentUserId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("getAllUsers", data);

    return data;
  }

  const handleSearch = async (query: string) => {

    "use server";

    try {
      const response = await fetch(
        `https://a25b-105-160-57-244.ngrok-free.app/api/users/search?q=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     
      const data = await response.json();
      console.log("SEARCH ERROR",data.message );
      return (data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/4 h-full bg-[#e8ebf6] rounded-l-[30px] p-4">
       <Search handleSearch={handleSearch}/>
       <Chats getAllUsers={getAllUsers}/>
      </div>
      <div className="w-3/4">{children}</div>
    </div>
  );
};
export default ChatLayout;
