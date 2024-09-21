"use client";
import Link from "next/link";
import {
  HiChatAlt2,
  HiUserCircle,
  HiClipboardList,
  HiLogout,
} from "react-icons/hi";

import { usePathname } from "next/navigation";

const NavigationButtons = () => {

  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full h-full pr-2">
      <div className="flex-1 flex-col w-full justify-center items-center">
        <Link
          href="/dashboard/chat"
          className={`group mb-4 px-4 py-2 rounded-xl flex flex-col justify-center items-center ${
           pathname === "/dashboard/chat"
              ? "bg-[#cfcece]"
              : "hover:bg-[#cfcece]"
          }`}
        >
          <HiChatAlt2 className="lg:size-10 xl:size-16 mb-1 xl:mb-3 text-gray-200 hover:text-white" />
          <p className="lg:text-xs xl:text-sm">All chats</p>
        </Link>

        <Link
          href="/dashboard/profile"
          className={`group mb-4 px-4 py-2 rounded-xl flex flex-col justify-center items-center ${
           pathname === "/dashboard/profile"
              ? "bg-[#cfcece]"
              : "hover:bg-[#cfcece]"
          }`}
        >
          <HiUserCircle className="lg:size-10 xl:size-16 mb-1 xl:mb-3 text-gray-200 hover:text-white" />
          <p className="lg:text-xs xl:text-sm">Profile</p>
        </Link>

        <Link
          href="/dashboard/tasks"
          className={`group mb-4 px-4 py-2 rounded-xl flex flex-col justify-center items-center ${
           pathname === "/dashboard/tasks"
              ? "bg-[#cfcece]"
              : "hover:bg-[#cfcece]"
          }`}
        >
          <HiClipboardList className="lg:size-10 xl:size-16 mb-1 xl:mb-3 text-gray-200 hover:text-white" />
          <p className="lg:text-xs xl:text-sm">Tasks</p>
        </Link>
      </div>

      <div className="mt-auto justify-end">
        <button className="flex justify-center items-center">
          <HiLogout className="lg:size-10 mb-2 text-gray-200" />
        </button>
      </div>
    </div>
  );
};
export default NavigationButtons;
