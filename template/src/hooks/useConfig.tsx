import * as config from "config";
import { useRpc } from ".";

export default function useConfig() {
  const { rpc } = useRpc(config.Network);

  return {
    network: config.Network,
    endpoint: rpc,
    offchainUrl: config.API_BASE_URL,
  };
}
