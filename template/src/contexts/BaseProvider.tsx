import React, { useCallback } from "react";
import { BaseProvider as Provider } from "react-base-kit";
import * as config from "config";

export default function BaseProvider({ children }: { children: React.ReactNode }) {

  const loginMethod = useCallback(async () => "token", []);

  return (
    <Provider config={{
      environment: config.environment,
      api: {
        local: config.localUrl,
        prod: config.prodUrl,
      },
      loginMethod
    }} >
      {children}
    </Provider>
  )
}
