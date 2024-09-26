"use client";
import { useState, useEffect } from "react";

const CreateCohortForm = () => {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [cohortName, setCohortName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch users from the backend

    const fetchUsers = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:3002/api/users?currentUserId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/api/cohort/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cohortName,
          members: selectedUsers,
        }),
      });
      const data = await response.json();
      console.log("Cohort created:", data);
    } catch (error) {
      console.error("Error creating cohort:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full bg-[#e8ebf6] rounded-[30px] px-4 py-6"
    >
      <div className="mb-4">
        <label
          htmlFor="cohortName"
          className="block text-base font-bold text-[#395290]"
        >
          Cohort Name
        </label>
        <input
          type="text"
          id="cohortName"
          value={cohortName}
          onChange={(e) => setCohortName(e.target.value)}
          className="mt-1 block w-full rounded-full bg[#e8ebf6] shadow-sm sm:text-sm px-5 py-2 h-10 text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="search"
          className="block text-base font-bold text-[#395290]"
        >
          Search Users
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1 block w-full rounded-full bg[#e8ebf6] shadow-sm sm:text-sm px-5 py-2 h-10 text-black"
        />
      </div>
      <div className="mb-4 h-40 overflow-y-auto">
        {users
          .filter((user) =>
            `${user.firstName} ${user.lastName}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((user) => (
            <div key={user.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={user.id}
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleUserSelect(user.id)}
                className="mr-2"
              />
              <label htmlFor={user.id} className="text-sm text-black">
                {user.firstName} {user.lastName}
              </label>
            </div>
          ))}
      </div>
      <button
        type="submit"
        className="bg-[#395290] text-white rounded-full h-12 w-full text-sm font-semibold px-5 py-2"
      >
        Create Cohort
      </button>
    </form>
  );
};

export default CreateCohortForm;
