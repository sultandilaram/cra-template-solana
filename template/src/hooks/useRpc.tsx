import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { RPC_LIST } from "config";
import { useLocalStorage } from ".";

export default function useRpc(network?: WalletAdapterNetwork) {
  const [rpc, setRpcState] = useLocalStorage("rpc", RPC_LIST[0].value);

  const setRpc = (name: string) => {
    if (network === WalletAdapterNetwork.Devnet) return;

    const rpc = RPC_LIST.find((option) => option.name === name);
    if (rpc) {
      setRpcState(rpc.value);
    } else {
      throw new Error("RPC not found");
    }
  };

  const getRpcName = () => {
    if (network === WalletAdapterNetwork.Devnet) return "Devnet";

    const rpc: any = RPC_LIST.find((option) => option.value === rpc);
    if (rpc) return rpc.name;
    return "Unknown RPC";
  };

  return {
    rpc,
    setRpc,
    getRpcName,
    rpcList: RPC_LIST,
  };
}
