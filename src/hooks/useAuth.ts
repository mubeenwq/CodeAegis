"use client";

import { useEffect, useState } from "react";
import { readStorage, removeStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

export interface AuthUser {
  fullName: string;
  email: string;
  role: string;
}

const DEFAULT_DEMO_USER: AuthUser = {
  fullName: "Abis Ahmad",
  email: "abis.ahmad@codeaegis.dev",
  role: "Lead Security Architect",
};

export function useAuth() {
  const [user, setUser] = useState<AuthUser>(DEFAULT_DEMO_USER);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStorage<AuthUser | null>(STORAGE_KEYS.AUTH_USER, null);
    if (stored) {
      setUser(stored);
    }
    setHydrated(true);
  }, []);

  const signIn = (email: string, fullName?: string) => {
    const nextUser: AuthUser = {
      fullName: fullName || email.split("@")[0] || "Security Engineer",
      email,
      role: "Security Engineer",
    };
    writeStorage(STORAGE_KEYS.AUTH_USER, nextUser);
    setUser(nextUser);
  };

  const signOut = () => {
    removeStorage(STORAGE_KEYS.AUTH_USER);
  };

  return { user, hydrated, signIn, signOut };
}
