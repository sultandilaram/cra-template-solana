import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useRpc } from '.';

const Network = WalletAdapterNetwork.Devnet;

export default function useConfig() {

  const { rpc } = useRpc(Network)

  return {
    network: Network,
    endpoint: rpc,
  }
}
