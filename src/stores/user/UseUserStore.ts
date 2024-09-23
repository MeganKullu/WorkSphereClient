import { create }from 'zustand';

interface UserState {
  userId: string | null;
  setUserId: (id: string) => void;
}

const useUserStore = create<UserState>((set: any) => ({
  userId: localStorage.getItem("userId"),
  setUserId: (id: string) => {
    if (typeof window !== 'undefined') {
      // Only access localStorage in the browser
      localStorage.setItem('userId', id);
    }
    set({ userId: id })},
}));

// Initialize the userId from localStorage if available
if (typeof window !== 'undefined') {
  const storedUserId = localStorage.getItem('userId');
  if (storedUserId) {
    useUserStore.setState({ userId: storedUserId });
  }
}

export default useUserStore;