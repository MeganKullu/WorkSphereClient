import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

interface UserState {
  userId: string | null;
  isAdmin: boolean;
  setUserId: (id: string, callback?: () => void) => void;
  setIsAdmin: (isAdmin: boolean, callback?: () => void) => void;
}

const sessionStoragePersist: PersistStorage<UserState> = {
  getItem: (name) => {
    const value = sessionStorage.getItem(name);
    console.log(`Getting item from sessionStorage: ${name} = ${value}`);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name, value) => {
    console.log(`Setting item in sessionStorage: ${name} = ${JSON.stringify(value)}`);
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    console.log(`Removing item from sessionStorage: ${name}`);
    sessionStorage.removeItem(name);
  },
};

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userId: get()?.userId || null,
      isAdmin: get()?.isAdmin || false,
      setUserId: (id: string, callback?: () => void) => {
        console.log(`Setting userId in state: ${id}`);
        set({ userId: id });
        if (callback) callback();
      },
      setIsAdmin: (isAdmin: boolean, callback?: () => void) => {
        console.log(`Setting isAdmin in state: ${isAdmin}`);
        set({ isAdmin });
        if (callback) callback();
      },
    }),
    {
      name: 'user-session-storage', // unique name for sessionStorage key
      storage: sessionStoragePersist,
    }
  )
);


export default useUserStore;