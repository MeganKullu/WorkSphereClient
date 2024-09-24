import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

interface UserState {
  userId: string | null;
  setUserId: (id: string) => void;
}

const sessionStoragePersist: PersistStorage<UserState> = {
  getItem: (name) => {
    const value = sessionStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    sessionStorage.removeItem(name);
  },
};

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (id: string) => set({ userId: id }),
    }),
    {
      name: 'user-session-storage', // unique name for sessionStorage key
      storage: sessionStoragePersist,
    }
  )
);

export default useUserStore;
