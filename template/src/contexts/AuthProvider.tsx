import React, { useCallback } from "react";
import { AuthProvider as Provider } from "react-solana";

export default function AuthProvider({ children }: { children: React.ReactNode }) {

  const loginMethod = useCallback(async () => "token", []);

  return (
    <Provider methods={{
      loginMethod
    }} >
      {children}
    </Provider>
  )
}
