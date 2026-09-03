import React, { createContext, useContext } from "react";
import { authClient } from "../lib/auth-client";

interface AuthContextValue {
  session: typeof authClient.$Infer.Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();

  const isAuthenticated = !!session?.user;

  return (
    <AuthContext.Provider
      value={{
        session: session ?? null,
        isLoading: isPending,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}
