import { create }from 'zustand';

interface UserState {
  userId: string | null;
  setUserId: (id: string) => void;
}

const useUserStore = create<UserState>((set: any) => ({
  userId: localStorage.getItem("userId"),
  setUserId: (id: string) => {
    localStorage.setItem("userId", id);
    set({ userId: id })},
}));

export default useUserStore;