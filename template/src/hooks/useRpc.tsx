import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import React from 'react';

const OPTIONS = [
  {
    label: 'Solana',
    name: 'Solana',
    value: 'https://api.mainnet-beta.solana.com/',
  },
  {
    label: 'Metaplex',
    name: 'Metaplex',
    value: 'https://api.metaplex.solana.com/',
  },
  {
    label: 'GenesysGo',
    name: 'GenesysGo',
    value: 'https://pentacle.genesysgo.net/',
  },
  {
    label: 'Serum',
    name: 'Serum',
    value: 'https://solana-api.projectserum.com/',
  },
];

export default function useRpc(network?: WalletAdapterNetwork) {

  const [rpc, setRpcState] = React.useState(() => {
    if (network === WalletAdapterNetwork.Devnet) {
      return 'https://api.devnet.solana.com/';
    }

    try {
      const item = localStorage.getItem('rpc');

      if (item) {
        return item
      } else {
        localStorage.setItem('rpc', OPTIONS[0].value);
        return OPTIONS[0].value
      }

    } catch {
      return OPTIONS[0].value
    }
  });

  const setRpc = (name: string) => {
    if (network === WalletAdapterNetwork.Devnet) return;

    const rpc = OPTIONS.find((option) => option.name === name);
    if (rpc) {
      setRpcState(rpc.value);
      localStorage.setItem('rpc', rpc.value);
    }
  };

  const getRpcName = () => {
    if (network === WalletAdapterNetwork.Devnet) return 'Devnet';

    const rpc: any = OPTIONS.find((option) => option.value === rpc);
    if (rpc) return rpc.name;
    return 'Unknown RPC';
  };

  return {
    rpc,
    setRpc,
    getRpcName,
    rpcList: OPTIONS,
  }
}
