// UserProvider.tsx
"use client";
import { useState, ReactNode } from 'react';
import { UserContext } from './UserContext';


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};