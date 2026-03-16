"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

export interface User {
  name: string;
  role: "admin" | "patient";
  avatar?: string;
}

interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
}


const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const defaultUser: User = isAdmin
    ? { name: "Hendrick", role: "admin", avatar: undefined }
    : { name: "Juan D. Santos", role: "patient", avatar: undefined };
  const [user, setUser] = useState<User>(defaultUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};
