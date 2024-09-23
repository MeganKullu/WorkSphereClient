"use client";

import { useState, useEffect } from "react";

interface SearchProps {
  handleSearch: (query: string) => Promise<UserSearch[] | undefined>;
}

const Search = ({ handleSearch } : SearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSearch[]>([]);

  //debounce function
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        handleSearch(query).then((data) => {
          if (data) {
            setResults(data);
          }
        });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

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
        {results.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
