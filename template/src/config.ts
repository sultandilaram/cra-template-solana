import { SolanaNetwork } from "react-solana";

export const network = SolanaNetwork.Devnet;
export const production = false;
export const localUrl: string = "http://localhost:4000";
export const prodUrl: string = "https://example.com";
export const RPC_List = [
  {
    name: "Solana",
    url: "https://api.mainnet-beta.solana.com/",
  },
  {
    name: "Metaplex",
    url: "https://api.metaplex.solana.com/",
  },
  {
    name: "GenesysGo",
    url: "https://pentacle.genesysgo.net/",
  },
  {
    name: "Serum",
    url: "https://solana-api.projectserum.com/",
  },
];
