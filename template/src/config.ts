import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const Network: WalletAdapterNetwork = WalletAdapterNetwork.Devnet;
export const PRODUCTION: boolean = false;

const localUrl: string = "http://localhost:4000";
const prodUrl: string = "https://example.com";

export const API_BASE_URL = PRODUCTION ? prodUrl : localUrl;

export const RPC_LIST = [
  {
    label: "Solana",
    name: "Solana",
    value: "https://api.mainnet-beta.solana.com/",
  },
  {
    label: "Metaplex",
    name: "Metaplex",
    value: "https://api.metaplex.solana.com/",
  },
  {
    label: "GenesysGo",
    name: "GenesysGo",
    value: "https://pentacle.genesysgo.net/",
  },
  {
    label: "Serum",
    name: "Serum",
    value: "https://solana-api.projectserum.com/",
  },
];
