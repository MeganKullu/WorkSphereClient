// here is where the naviagation will go
// we add the use context here actually if the xustand store does not work
"use client";


import NavigationButtons from "@/components/navigation/NavigationButtons";
import useChatStore from "@/stores/chat/useChatStore"; 

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = useChatStore((state) => state.isAdmin);

  return (
    <div className="flex w-full h-full bg-[#0c0f19] p-2 xl:p-4">
      <div className="h-full w-24 xl:w-28">
        {/* navigation links will go here with the background*/}
        <NavigationButtons />
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
};
export default dashboardLayout;
