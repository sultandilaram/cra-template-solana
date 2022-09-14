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
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { SolanaNetwork } from "react-solana";

interface Props {
  children: React.ReactNode;
}
export default function WalletProviders({ children }: Props) {

  const config = useConfig();

  const network = React.useMemo(() => {
    switch (config.network) {
      case SolanaNetwork.Mainnet:
        return WalletAdapterNetwork.Mainnet
      default:
        return WalletAdapterNetwork.Devnet;
    }
  }, [config.network])

  const wallets = React.useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new SolletWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={config.rpc_url as string}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
