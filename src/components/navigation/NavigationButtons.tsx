"use client";
import Link from "next/link";
import {
  HiChatAlt2,
  HiUserCircle,
  HiClipboardList,
  HiLogout,
} from "react-icons/hi";

const NavigationButtons = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex-col w-full justify-center items-center">
        <Link
          href="/dashboard/chat"
          className="mb-4 hover:bg-[#cfcece] px-4 py-2 rounded-xl"
        >
          <HiChatAlt2 className="size-12 mb-1 text-gray-200 hover:text-white" />
          <p className="text-sm">All chats</p>
        </Link>

        <Link
          href="/dashboard/profile"
          className="mb-4 hover:bg-[#cfcece] px-4 py-2 rounded-xl"
        >
          <HiUserCircle className="size-12 mb-1 text-gray-200" />
          <p className="text-sm">Profile</p>
        </Link>

        <Link
          href="/dashboard/tasks"
          className="mb-4 hover:bg-[#cfcece] px-4 py-2 rounded-xl"
        >
          <HiClipboardList className="size-12 mb-1 text-gray-200" />
          <p className="text-sm">Tasks</p>
        </Link>
      </div>

      <div className="mt-auto justify-end">
        <button>
            <HiLogout className="size-10 mb-2 text-gray-200"/>
        </button>
      </div>
    </div>
  );
};
export default NavigationButtons;
