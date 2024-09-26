"use client";
import useUserStore from "@/stores/user/UseUserStore";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface CreateCohortFormProps {
  currentUserId: string | null;
}

const CreateCohortForm: React.FC<CreateCohortFormProps> = ({
}) => {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [cohortName, setCohortName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUserId = useUserStore((state) => state.userId);
  console.log("currentUserId", currentUserId);


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
  }, [currentUserId]);

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
      setLoading(true);
      const response = await fetch("http://localhost:3002/api/cohort/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cohortName,
          members: [...selectedUsers, currentUserId], 
          currentUserId,// Here we are adding the creater to the members of the group
        }),
      });
      const data = await response.json();
      console.log("Cohort created:", data);
      toast.success(`Cohort "${data.name}" created successfully!`);
      setCohortName("");
      setSelectedUsers([]);
      setSearchTerm("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error creating cohort. Please try again.");
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
          className="block text-base font-semibold text-black"
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
          className="block text-base font-semibold text-black"
        >
          Search Users
        </label>
        <input
          type="text"
          id="search"
          placeholder="Type to search users"
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
        className="bg-[#395290] text-white rounded-full h-12 w-full text-sm font-semibold px-5 py-2 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "Create Cohort"
        )}
      </button>
    </form>
  );
};

export default CreateCohortForm;
