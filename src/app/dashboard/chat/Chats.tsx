// here we will map over  all over the chats and and a on click function that will update the chat window
// we will use the active buttons
// the routes should be dynamic?

"use client";

import Link from "next/link";

const chatId = "1";

const Chats = () => {
  return (
    <>
      <Link href={`/dashboard/chat/${chatId}`} className="rounded-lg py-2 px-3 flex hover:bg-[#d5dbe7]">
        <div className="basis-1/4 rounded-lg bg-black">{/* image goes here */}</div>
        <div className="basis-3/4 mx-2">
          {/* name of the use/group goes here */}
          <div className="flex justify-between mb-1">
            {/* here the time stamp */}
           
            <p className="text-base font-semibold text-black"> Design Chat</p>
            <p className="text-gray-400"> 4m</p>
          </div>
           {/* here we truncate the new message */}
          <p>
            How are you today
          </p>
        </div>
      </Link>

      <Link href={`/dashboard/chat/${chatId}`} className="rounded-lg py-2 px-3 flex hover:bg-[#d5dbe7]">
        <div className="basis-1/4 rounded-lg bg-black">{/* image goes here */}</div>
        <div className="basis-3/4 mx-2">
          {/* name of the use/group goes here */}
          <div className="flex justify-between mb-1">
            {/* here the time stamp */}
           
            <p className="text-base font-semibold text-black"> Design Chat</p>
            <p className="text-gray-400"> 4m</p>
          </div>
           {/* here we truncate the new message */}
          <p>
            How are you today
          </p>
        </div>
      </Link>
    </>
  );
};
export default Chats;
