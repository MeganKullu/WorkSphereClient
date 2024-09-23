// UserContext.tsx
import { createContext } from 'react';

interface UserContextType {
  user: string | null;
  setUser: (user: string) => void;
}

export const UserContext = createContext<UserContextType>({
  user: "",
  setUser: () => {},
});

