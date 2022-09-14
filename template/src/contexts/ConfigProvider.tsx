import { ConfigProvider as Provider } from "react-solana";
import * as config from "config";

export default function ConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider config={config}>
      {children}
    </Provider>
  )
}
