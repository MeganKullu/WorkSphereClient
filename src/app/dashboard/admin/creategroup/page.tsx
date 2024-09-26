"use client";
import useUserStore from "@/stores/user/UseUserStore";
//Here we will get the userID from the session storage then pass it to the createCohort Form

import CreateCohortForm from "./CreateCohortForm";

const page = () => {
  
  const currentUserId = useUserStore((state) => state.userId);

  return (
    <div className="h-full w-full p-4 flex flex-col justify-center items-center">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <p className="text-white text-center text-2xl font-bold mt-4 mb-6">
          Create a group
        </p>
        <div className="w-1/2  bg-[#e8ebf6] rounded-[30px]">
          <CreateCohortForm currentUserId={currentUserId} />
        </div>
      </div>
    </div>
  );
};
export default page;
