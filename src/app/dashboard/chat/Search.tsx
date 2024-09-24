"use client";

import useUserStore from "@/stores/user/UseUserStore";
import Link from "next/link";
import { useState, useEffect } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSearch[]>([]);
  const userId = useUserStore((state) => state.userId);

  
  const currentUserId = userId;

  const handleSearch = async (query: string) => {
    if (!query) {
      return [];
    }

    try {
      console.log("Trying serach");
      const response = await fetch(
        `http://localhost:3002/api/users/search?q=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  //debounce function
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        handleSearch(query).then((data) => {
          if (data) {
            setResults(data || []);
          }
        });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  //generateTheRoomId

  const generateRoomId = (userId1: string | null, userId2: string) => {
    // Convert IDs to strings in case they are numeric

    const [first, second] = [userId1?.toString(), userId2.toString()].sort();
    return `${first}_${second}`;
  };

  const encodeId = (id: string | null) => {
    return id ? Buffer.from(id).toString("base64") : "";
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-5 py-3 rounded-lg bg-[#cdd5ea] my-2 text-sm text-black"
        />
      </form>
      <ul>
        {results.map((user) => {
          const receiverId = user.id;
          const roomId = generateRoomId(currentUserId, receiverId);
          const encodedSenderId = encodeId(currentUserId);
          const encodedReceiverId = encodeId(receiverId);
          return (
            <Link
              href={{
                pathname: `/dashboard/chat/${roomId}`,
                query: {
                  name: user.firstName,
                  encodedSenderId,
                  encodedReceiverId,
                  roomId,
                },
              }}
              key={user.id}
              className={`group rounded-lg py-2 px-3 flex hover:bg-[#d5dbe7] h-16 border-b-2 border-[#cdd5ea]}`}
            >
              <div className="basis-1/4 rounded-lg bg-black">
                {/* image goes here */}
              </div>
              <div className="basis-3/4 mx-2">
                <div className="flex mb-1">
                  <div className="flex gap-1">
                    <p className="text-black text-sm font-semibold">
                      {user.firstName}
                    </p>
                    <p className="text-black text-sm font-semibold">
                      {user.lastName}
                    </p>
                  </div>
                </div>
                {/* here we truncate the new message */}
                <p className="line-clamp-1 text-sm text-black"></p>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;
