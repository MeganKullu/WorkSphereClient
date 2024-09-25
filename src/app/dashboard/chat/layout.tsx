import Search from "./Search";
import Chats from "./Chats";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  //here we will handle getting all the current active chats and the search

  return (
    <div className="flex h-full">
      <div className="w-1/4 h-full bg-[#e8ebf6] rounded-l-[30px] p-4">
        <div className="flex-shrink-0 max-h-24">
          <Search />
        </div>
        <div className="text-black font-semibold text-2xl">Chats</div>
        <div className="flex-grow overflow-y-auto mt-2">
          <Chats />
        </div>
      </div>
      <div className="w-3/4">{children}</div>
    </div>
  );
};
export default ChatLayout;
