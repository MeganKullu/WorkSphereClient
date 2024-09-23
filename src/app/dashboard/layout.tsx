// here is where the naviagation will go

import NavigationButtons from "@/components/navigation/NavigationButtons";
import { UserProvider } from "@/contexts/user/UserProvider";

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <div className="flex w-full h-full bg-[#0c0f19] p-2 xl:p-4">
        <div className="h-full w-24 xl:w-28">
          {/* navigation links will go here with the background*/}
          <NavigationButtons />
        </div>
        <div className="h-full w-full">{children}</div>
      </div>
    </UserProvider>
  );
};
export default dashboardLayout;
