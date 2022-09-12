import React from "react";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useConfig } from "../hooks";

interface Props {
  children: React.ReactNode;
}
export default function WalletProviders({ children }: Props) {

  const config = useConfig();

  const wallets = React.useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network: config.network }),
      new SolletWalletAdapter({ network: config.network }),
      new TorusWalletAdapter(),
    ],
    [config.network]
  );

  return (
    <ConnectionProvider endpoint={config.endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
