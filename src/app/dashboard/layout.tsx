// here is where the naviagation will go
// we add the use context here actually if the xustand store does not work
"use client";

import NavigationButtons from "@/components/navigation/NavigationButtons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <SessionProvider>
        <ToastContainer />
        <div className="flex w-full h-full bg-[#0c0f19] p-2 xl:p-4">
          <div className="h-full w-24 xl:w-28">
            {/* navigation links will go here with the background*/}
            <NavigationButtons />
          </div>
          <div className="h-full w-full">{children}</div>
        </div>
      </SessionProvider>
    </>
  );
};
export default dashboardLayout;
